import { lightColors, useColors } from "@lib/hooks";
import { Icon, IconPower } from "@tabler/icons-react-native";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "./Title";
import { ThemeIcon } from "./ThemeIcon";
import { PowerSwitch } from "./PowerSwitch";
import Subtitle from "./Subtitle";
import { ColumnUsageIndicator } from "./ColumnUsageIndicator";

export type DeviceTileProps = {
  background?: string;
  name: string;
  activeSince?: number;
  currentConsumption?: number;
  lastConsumption?: number;
  small?: boolean;
};

export function DeviceTile({
  background,
  name,
  activeSince,
  currentConsumption,
  lastConsumption,
  small,
}: DeviceTileProps) {
  const { tileColor, lightTextColors, defaultColors } = useColors();

  const [power, setPower] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        tile: {
          borderRadius: 15,
          backgroundColor: power
            ? defaultColors["green"][6]
            : background ?? tileColor,
          padding: 15,
        },
        header: {
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginBottom: 10,
        },
        text: {
          display: "flex",
          justifyContent: "center",
        },
        usage: {
          display: "flex",
          flexDirection: "row",
          gap: 25,
        },
      }),
    [background, tileColor, power]
  );

  return (
    <View style={styles.tile}>
      {
        <View style={styles.header}>
          <PowerSwitch
            power={power}
            onPress={() => {
              setPower((p) => !p);
            }}
          />
          <View style={styles.text}>
            <Title lightText={power} color={0} order={2}>
              {name}
            </Title>
            {power && activeSince && (
              <Subtitle
                color={power ? lightTextColors[0] : undefined}
                order={5}
              >
                {`Włączony od: ${Math.floor(activeSince / 60)}h ${
                  activeSince % 60
                }min`}
              </Subtitle>
            )}
          </View>
        </View>
      }
      <View style={styles.usage}>
        <ColumnUsageIndicator
          label="Ostatnie 24h:"
          value="200Wh"
          color="green"
          lightText={power}
        />
        {power && (
          <ColumnUsageIndicator
            label="Bieżące zużycie:"
            value="240W"
            color="orange"
            lightText={power}
          />
        )}
      </View>
    </View>
  );
}
