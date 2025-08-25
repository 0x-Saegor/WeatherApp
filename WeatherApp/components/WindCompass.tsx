import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Line, Polygon, Text as SvgText } from "react-native-svg";
import { ThemedText } from "./ThemedText";

type WindCompassProps = {
  windDir: string; // e.g. "SE"
  windSpeed: number; // in km/h
};

const directionToDegrees: Record<string, number> = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

export const WindCompass = ({ windDir, windSpeed }: WindCompassProps) => {
  const size = 150;
  const center = size / 2;
  const arrowLength = 50;

  const directionDegree = directionToDegrees[windDir.toUpperCase()] ?? 0;
  const angleRad = (directionDegree - 180) * (Math.PI / 180);

  const shaftX = center - arrowLength * Math.sin(angleRad);
  const shaftY = center + arrowLength * Math.cos(angleRad);

  const arrowHeadLength = 12;
  const arrowBaseWidth = 8;

  const arrowTipX =
    center - (arrowLength + arrowHeadLength) * Math.sin(angleRad);
  const arrowTipY =
    center + (arrowLength + arrowHeadLength) * Math.cos(angleRad);

  const baseLeftX = shaftX + (arrowBaseWidth / 2) * Math.cos(angleRad);
  const baseLeftY = shaftY + (arrowBaseWidth / 2) * Math.sin(angleRad);

  const baseRightX = shaftX - (arrowBaseWidth / 2) * Math.cos(angleRad);
  const baseRightY = shaftY - (arrowBaseWidth / 2) * Math.sin(angleRad);

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        <Circle
          cx={center}
          cy={center}
          r={center - 8}
          stroke="#64748b"
          strokeWidth="2"
          fill="#f8fafc"
        />

        <Circle
          cx={center}
          cy={center}
          r={center - 20}
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="4,2"
          fill="none"
        />

        {["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir) => {
          const deg = directionToDegrees[dir];
          const rad = (deg - 180) * (Math.PI / 180);
          const labelX = center - (center - 15) * Math.sin(rad);
          const labelY = center + (center - 15) * Math.cos(rad);

          return (
            <SvgText
              key={dir}
              x={labelX}
              y={labelY + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#334155"
            >
              {dir}
            </SvgText>
          );
        })}

        <Line
          x1={center}
          y1={center}
          x2={shaftX}
          y2={shaftY}
          stroke="#1e3a8a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <Polygon
          points={`${arrowTipX},${arrowTipY} ${baseLeftX},${baseLeftY} ${baseRightX},${baseRightY}`}
          fill="#1e3a8a"
        />
      </Svg>

      <ThemedText type="default" style={styles.text}>
        Wind: {windSpeed} km/h from {windDir.toUpperCase()}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
});
