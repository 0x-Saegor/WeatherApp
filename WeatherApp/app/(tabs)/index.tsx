import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source="https://static.independent.co.uk/2025/04/25/13/42/iStock-1498516775.jpg"
          style={styles.reactLogo}
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
              // setResponse(await getWeather(city));
              setResponse(tester);
              setIsLoaded(true);
            }}
          />
        </ThemedView>
        <ThemedView style={styles.weatherCard}>
          <Image
            source={
              response?.["current"]?.["condition"]?.["icon"]
                ? `https:${response?.["current"]?.["condition"]?.["icon"]}`
                : undefined
            }
            style={styles.weatherIcon}
          />
          <ThemedText type="default" style={styles.weatherText}>
            {response?.["current"]?.["condition"]?.["text"]}
          </ThemedText>
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
  reactLogo: {
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
