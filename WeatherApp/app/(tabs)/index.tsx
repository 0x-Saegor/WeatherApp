import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { checkConnectivity, getWeather } from "@/api/fetchApi";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
      wind_degree: 135,
      wind_dir: "SE",
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
              console.log(local_response);

              setIsLoading(false);
              if (local_response.networkError) {
                setIsOnline(false);
              } else if (local_response.error) {
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
          <ThemedView
            style={[
              styles.weatherCard,
              error && {
                backgroundColor: "#fdecea",
              },
            ]}
          >
            {isLoading ? (
              <ThemedView
                style={{
                  alignItems: "center",
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              >
                <ActivityIndicator size="large" />
              </ThemedView>
            ) : (
              <>
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
              </>
            )}
          </ThemedView>
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
