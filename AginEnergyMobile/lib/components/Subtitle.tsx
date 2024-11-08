import { useColors } from "@lib/hooks/useColors";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export type SubtitleProps = {
  order?: 1 | 2 | 3 | 4 | 5;
  align?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  children?: React.ReactNode;
  color?: string;
};

export default function Subtitle({
  order,
  align,
  children,
  color,
}: SubtitleProps) {
  const { textColors } = useColors();
  const sizes = {
    1: 20,
    2: 18,
    3: 16,
    4: 14,
    5: 12,
  };
  const styles = useMemo(
    () =>
      StyleSheet.create({
        title: {
          fontFamily: "Poppins-Regular",
          color: color || textColors[2],
          fontSize: sizes[order || 1],
          textAlign: align,
        },
      }),
    [textColors, order, align]
  );

  return <Text style={[styles.title]}>{children}</Text>;
}
