package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var API_KEY string

func getWeather(c *gin.Context) {
	city := c.Param("city")
	fmt.Println("getWeather -> " + city)
	fmt.Println("API KEY", API_KEY)

	c.JSON(200, gin.H{
		"message": fmt.Sprintf("Weather for %s will be here.", city),
	})

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
