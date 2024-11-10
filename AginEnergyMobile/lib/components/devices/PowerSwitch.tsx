import { DefaultColor, useColors } from "@lib/hooks";
import { Icon, IconPower } from "@tabler/icons-react-native";
import React, { useMemo } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";

export type PowerSwitchProps = {
  color?: DefaultColor;
  size?: number;
  power?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
};

export function PowerSwitch({ color, size, power, onPress }: PowerSwitchProps) {
  const { defaultColors, switchOffState, lightTextColors, colors } =
    useColors();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: size ?? 36,
          height: size ?? 36,
          // zIndex: 10,
          borderRadius: 999999,
          backgroundColor: power ? colors[8] : switchOffState,
          justifyContent: "center",
          alignItems: "center",
        },
      }),
    [color, size, power]
  );

  return (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.container}>
        {/* TODO: Add icon size calculation */}
        <IconPower
          color={power ? lightTextColors[0] : defaultColors["gray"][7]}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
}
