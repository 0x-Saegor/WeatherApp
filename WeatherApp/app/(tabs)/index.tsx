import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { getWeather } from "@/api/fetchApi";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function HomeScreen() {
  const [city, setCity] = useState("Paris");
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
          <ThemedButton title="Show weather" onPress={() => getWeather(city)} />
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
});
