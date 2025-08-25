import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { checkConnectivity, getWeather } from "@/api/fetchApi";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { WindCompass } from "@/components/WindCompass";
import { useState } from "react";

export default function HomeScreen() {
  const [city, setCity] = useState("Paris");
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateOnlineStatus = async () => {
    const isOnline = await checkConnectivity();
    setIsOnline(isOnline);
  };

  const tester = {
    current: {
      cloud: 0,
      condition: {
        code: 1276,
        icon: "//cdn.weatherapi.com/weather/64x64/day/389.png",
        text: "Moderate or heavy rain with thunder",
      },
      dewpoint_c: 10.2,
      dewpoint_f: 50.4,
      diff_rad: 143.86,
      dni: 126.57,
      feelslike_c: 27.4,
      feelslike_f: 81.3,
      gti: 138.33,
      gust_kph: 8,
      gust_mph: 5,
      heatindex_c: 27.2,
      heatindex_f: 81,
      humidity: 42,
      is_day: 1,
      last_updated: "2025-08-19 16:30",
      last_updated_epoch: 1755613800,
      precip_in: 0,
      precip_mm: 0,
      pressure_in: 29.85,
      pressure_mb: 1011,
      short_rad: 245.84,
      temp_c: 28.2,
      temp_f: 82.8,
      uv: 1.9,
      vis_km: 10,
      vis_miles: 6,
      ["wind_degree"]: 135,
      wind_dir: "NEtu",
      wind_kph: 6.8,
      wind_mph: 4.3,
      windchill_c: 28,
      windchill_f: 82.4,
    },
    location: {
      country: "France",
      lat: 48.8667,
      localtime: "2025-08-19 16:33",
      localtime_epoch: 1755614004,
      lon: 2.3333,
      name: "Paris",
      region: "Ile-de-France",
      tz_id: "Europe/Paris",
    },
  };

  const weather = [
    {
      code: 1000,
      day: "Sunny",
      night: "Clear",
      icon: 113,
    },
    {
      code: 1003,
      day: "Partly cloudy",
      night: "Partly cloudy",
      icon: 116,
    },
    {
      code: 1006,
      day: "Cloudy",
      night: "Cloudy",
      icon: 119,
    },
    {
      code: 1009,
      day: "Overcast",
      night: "Overcast",
      icon: 122,
    },
    {
      code: 1030,
      day: "Mist",
      night: "Mist",
      icon: 143,
    },
    {
      code: 1063,
      day: "Patchy rain possible",
      night: "Patchy rain possible",
      icon: 176,
    },
    {
      code: 1066,
      day: "Patchy snow possible",
      night: "Patchy snow possible",
      icon: 179,
    },
    {
      code: 1069,
      day: "Patchy sleet possible",
      night: "Patchy sleet possible",
      icon: 182,
    },
    {
      code: 1072,
      day: "Patchy freezing drizzle possible",
      night: "Patchy freezing drizzle possible",
      icon: 185,
    },
    {
      code: 1087,
      day: "Thundery outbreaks possible",
      night: "Thundery outbreaks possible",
      icon: 200,
    },
    {
      code: 1114,
      day: "Blowing snow",
      night: "Blowing snow",
      icon: 227,
    },
    {
      code: 1117,
      day: "Blizzard",
      night: "Blizzard",
      icon: 230,
    },
    {
      code: 1135,
      day: "Fog",
      night: "Fog",
      icon: 248,
    },
    {
      code: 1147,
      day: "Freezing fog",
      night: "Freezing fog",
      icon: 260,
    },
    {
      code: 1150,
      day: "Patchy light drizzle",
      night: "Patchy light drizzle",
      icon: 263,
    },
    {
      code: 1153,
      day: "Light drizzle",
      night: "Light drizzle",
      icon: 266,
    },
    {
      code: 1168,
      day: "Freezing drizzle",
      night: "Freezing drizzle",
      icon: 281,
    },
    {
      code: 1171,
      day: "Heavy freezing drizzle",
      night: "Heavy freezing drizzle",
      icon: 284,
    },
    {
      code: 1180,
      day: "Patchy light rain",
      night: "Patchy light rain",
      icon: 293,
    },
    {
      code: 1183,
      day: "Light rain",
      night: "Light rain",
      icon: 296,
    },
    {
      code: 1186,
      day: "Moderate rain at times",
      night: "Moderate rain at times",
      icon: 299,
    },
    {
      code: 1189,
      day: "Moderate rain",
      night: "Moderate rain",
      icon: 302,
    },
    {
      code: 1192,
      day: "Heavy rain at times",
      night: "Heavy rain at times",
      icon: 305,
    },
    {
      code: 1195,
      day: "Heavy rain",
      night: "Heavy rain",
      icon: 308,
    },
    {
      code: 1198,
      day: "Light freezing rain",
      night: "Light freezing rain",
      icon: 311,
    },
    {
      code: 1201,
      day: "Moderate or heavy freezing rain",
      night: "Moderate or heavy freezing rain",
      icon: 314,
    },
    {
      code: 1204,
      day: "Light sleet",
      night: "Light sleet",
      icon: 317,
    },
    {
      code: 1207,
      day: "Moderate or heavy sleet",
      night: "Moderate or heavy sleet",
      icon: 320,
    },
    {
      code: 1210,
      day: "Patchy light snow",
      night: "Patchy light snow",
      icon: 323,
    },
    {
      code: 1213,
      day: "Light snow",
      night: "Light snow",
      icon: 326,
    },
    {
      code: 1216,
      day: "Patchy moderate snow",
      night: "Patchy moderate snow",
      icon: 329,
    },
    {
      code: 1219,
      day: "Moderate snow",
      night: "Moderate snow",
      icon: 332,
    },
    {
      code: 1222,
      day: "Patchy heavy snow",
      night: "Patchy heavy snow",
      icon: 335,
    },
    {
      code: 1225,
      day: "Heavy snow",
      night: "Heavy snow",
      icon: 338,
    },
    {
      code: 1237,
      day: "Ice pellets",
      night: "Ice pellets",
      icon: 350,
    },
    {
      code: 1240,
      day: "Light rain shower",
      night: "Light rain shower",
      icon: 353,
    },
    {
      code: 1243,
      day: "Moderate or heavy rain shower",
      night: "Moderate or heavy rain shower",
      icon: 356,
    },
    {
      code: 1246,
      day: "Torrential rain shower",
      night: "Torrential rain shower",
      icon: 359,
    },
    {
      code: 1249,
      day: "Light sleet showers",
      night: "Light sleet showers",
      icon: 362,
    },
    {
      code: 1252,
      day: "Moderate or heavy sleet showers",
      night: "Moderate or heavy sleet showers",
      icon: 365,
    },
    {
      code: 1255,
      day: "Light snow showers",
      night: "Light snow showers",
      icon: 368,
    },
    {
      code: 1258,
      day: "Moderate or heavy snow showers",
      night: "Moderate or heavy snow showers",
      icon: 371,
    },
    {
      code: 1261,
      day: "Light showers of ice pellets",
      night: "Light showers of ice pellets",
      icon: 374,
    },
    {
      code: 1264,
      day: "Moderate or heavy showers of ice pellets",
      night: "Moderate or heavy showers of ice pellets",
      icon: 377,
    },
    {
      code: 1273,
      day: "Patchy light rain with thunder",
      night: "Patchy light rain with thunder",
      icon: 386,
    },
    {
      code: 1276,
      day: "Moderate or heavy rain with thunder",
      night: "Moderate or heavy rain with thunder",
      icon: 389,
    },
    {
      code: 1279,
      day: "Patchy light snow with thunder",
      night: "Patchy light snow with thunder",
      icon: 392,
    },
    {
      code: 1282,
      day: "Moderate or heavy snow with thunder",
      night: "Moderate or heavy snow with thunder",
      icon: 395,
    },
  ];

  !isOnline && updateOnlineStatus();

  return isOnline ? (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source="https://static.independent.co.uk/2025/04/25/13/42/iStock-1498516775.jpg"
          style={styles.backgroundImage}
        />
      }
    >
      <GestureHandlerRootView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Weather App</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedInput
            type="default"
            placeholder="Paris"
            value={city}
            onChangeText={setCity}
          />
          <ThemedButton
            title="Show weather"
            onPress={async () => {
              setIsLoaded(true);
              setIsLoading(true);

              const local_response = await getWeather(city);
              // const local_response = tester;

              setIsLoading(false);
              if (local_response.networkError) {
                setIsOnline(false);
              } else if (local_response.error !== undefined) {
                setError(true);
                setResponse(local_response);
              } else {
                setResponse(local_response);
                setError(false);
                // setResponse(tester);
              }
            }}
          />
        </ThemedView>
        {isLoaded && (
          <>
            {isLoading ? (
              <ThemedView
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 40,
                }}
              >
                <ActivityIndicator size="large" />
              </ThemedView>
            ) : (
              <ThemedView style={{ marginTop: 10 }}>
                <ThemedText style={{ textAlign: "center" }} type="small">
                  Last updated : {response?.["current"]?.["last_updated"]}
                </ThemedText>
                <ThemedView
                  style={[
                    styles.weatherCard,
                    error && { backgroundColor: "#fdecea" },
                  ]}
                >
                  {!error && (
                    <Image
                      source={
                        response?.["current"]?.["condition"]?.["icon"]
                          ? `https:${response?.["current"]?.["condition"]?.["icon"]}`
                          : undefined
                      }
                      style={styles.weatherIcon}
                    />
                  )}
                  <ThemedText
                    type="default"
                    style={[styles.weatherText, error && { color: "red" }]}
                  >
                    {!error
                      ? response?.["current"]?.["condition"]?.["text"]
                      : response?.["error"]?.["message"] +
                        " (" +
                        response?.["error"]?.["code"] +
                        ")"}
                  </ThemedText>
                </ThemedView>

                <ThemedView
                  style={[
                    styles.weatherCard,
                    {
                      flexDirection: "column",
                      backgroundColor: "#d0f1bbff",
                      alignItems: "flex-start",
                      gap: 10,
                    },
                  ]}
                >
                  <ThemedText type="defaultSemiBold">Temperature</ThemedText>
                  <ThemedText>
                    Real temperature : {response?.["current"]?.["temp_c"]}°C
                  </ThemedText>
                  <ThemedText>
                    Feels like : {response?.["current"]?.["feelslike_c"]}°C
                  </ThemedText>
                </ThemedView>
                <ThemedView
                  style={[
                    styles.weatherCard,
                    {
                      flexDirection: "column",
                      backgroundColor: "#f1f5f9", // light gray-blue
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 20,
                      width: "100%",
                    },
                  ]}
                >
                  <WindCompass
                    windSpeed={response?.["current"]?.["wind_kph"]}
                    windDir={response?.["current"]?.["wind_dir"]}
                  />
                </ThemedView>
              </ThemedView>
            )}
          </>
        )}
      </GestureHandlerRootView>
    </ParallaxScrollView>
  ) : (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source="https://static.independent.co.uk/2025/04/25/13/42/iStock-1498516775.jpg"
          style={styles.backgroundImage}
        />
      }
    >
      <GestureHandlerRootView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Weather App</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}></ThemedView>
        <ThemedView style={styles.errorCard}>
          <ThemedText type="subtitle">
            Connection failed, please try again
          </ThemedText>
          <ThemedButton
            title="Try again"
            onPress={updateOnlineStatus}
            style={[{ backgroundColor: "#d9534f" }]}
            textStyle={{
              color: "#fff", // white text for contrast
              fontWeight: "600",
            }}
          />
        </ThemedView>
      </GestureHandlerRootView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginVertical: 10,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  weatherCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f7fa", // light blue-ish background, adapt to your theme
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // for Android shadow
  },

  errorCard: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fdecea", // light red background
    padding: 16,
    borderRadius: 10,
    marginVertical: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: "#f5c6cb", // subtle red border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  weatherIcon: {
    width: 48,
    height: 48,
    marginRight: 12,
  },

  weatherText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00796b", // teal-ish text, adjust as needed
  },
});
