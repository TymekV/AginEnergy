import { DefaultColor, StatusColors, useColors } from "@lib/hooks";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "../Title";

export type InlineUsageIndicatorProps = {
  label: string;
  value: string;
  description?: string;
  color?: StatusColors;
  lightText?: boolean;
};

export function ColumnUsageIndicator({
  label,
  value,
  color,
  lightText,
}: InlineUsageIndicatorProps) {
  const { defaultColors, textColors, statusColors } = useColors();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "column",
          //   gap: 5,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <Title lightText={lightText} color={0} order={3}>
        {label}
      </Title>
      <View>
        <Title
          order={2}
          color={color ? statusColors[color][lightText ? 0 : 1] : textColors[0]}
          fontFamily="Poppins-Bold"
        >
          {value}
        </Title>
      </View>
    </View>
  );
}
