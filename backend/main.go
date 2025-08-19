package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var API_KEY string

func getWeather(c *gin.Context) {
	city := c.Param("city")
	fmt.Println("getWeather -> " + city)

	response, err := http.Get("https://api.weatherapi.com/v1/current.json?key=" + API_KEY + "&q=" + city + "&aqi=no")

	if err != nil {
		fmt.Print("ERROR, ", err)
		return

	}

	body, err := io.ReadAll(response.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
		return
	}

	var weatherData map[string]interface{}
	if err := json.Unmarshal(body, &weatherData); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse JSON"})
		return
	}

	fmt.Print(weatherData)
	c.JSON(200, weatherData)
}

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Warning: .env file not found")
	}

	API_KEY = os.Getenv("WEATHER_API_KEY")

	router := gin.Default()

	router.GET("/weather/:city", getWeather)

	router.Run("0.0.0.0:3000")
}

// Un appel à l'api pour une ville précise -> si la dernière donnée date de plus de 30 minutes on fait un appel API
// On renvoie la donnée
// On peut stocker nos données dans un dico avec en valeur un couple json /

/*
map[
current:map[
cloud:0
condition:map[code:1276 icon://cdn.weatherapi.com/weather/64x64/day/389.png text:Moderate or heavy rain with thunder]
dewpoint_c:9.4
dewpoint_f:48.9
diff_rad:152.35
dni:136.94
feelslike_c:28.4 feelslike_f:83 gti:147.26 gust_kph:7.1 gust_mph:4.4 heatindex_c:26.9 heatindex_f:80.4 humidity:37 is_day:1 last_updated:2025-08-19 15:45 last_updated_epoch:1.7556111e+09 precip_in:0 precip_mm:0 pressure_in:29.88 pressure_mb:1012 short_rad:260.28 temp_c:29.3 temp_f:84.7 uv:1.9 vis_km:10 vis_miles:6 wind_degree:151 wind_dir:SSE wind_kph:6.1 wind_mph:3.8 windchill_c:27.7 windchill_f:81.9] location:map[country:France lat:48.8667 localtime:2025-08-19 15:53 localtime_epoch:1.755611591e+09 lon:2.3333 name:Paris region:Ile-de-France tz_id:Europe/Paris]][GIN]

*/
