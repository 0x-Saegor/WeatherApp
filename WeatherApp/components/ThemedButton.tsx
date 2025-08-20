import { useThemeColor } from "@/hooks/useThemeColor";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

export type ThemedButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function ThemedButton({
  title,
  onPress,
  lightColor,
  darkColor,
  type = "default",
  style,
  textStyle,
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: "#eee", dark: "#333" },
    "background"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? style?.backgroundColor || "#ccc"
            : style?.backgroundColor || backgroundColor,
        },
        styles.buttonBase,
        style, // this should be last so it can override previous ones
      ]}
    >
      <Text
        style={[
          { color: textColor },
          type === "default" ? styles.default : undefined,
          type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
          type === "title" ? styles.title : undefined,
          type === "subtitle" ? styles.subtitle : undefined,
          type === "link" ? styles.link : undefined,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontSize: 16,
    color: "#0a7ea4",
    textDecorationLine: "underline",
  },
});
