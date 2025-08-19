import { Platform, StyleSheet, Text, type TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput } from "react-native-gesture-handler";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  placeholder,
  type = "default",
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TextInput
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        style,
      ]}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlignVertical: "center", // Android uniquement
  },
});
