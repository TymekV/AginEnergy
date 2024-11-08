import { lightColors, useColors } from "@lib/hooks";
import { Icon, IconPower } from "@tabler/icons-react-native";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "../Title";
import { ThemeIcon } from "../ThemeIcon";
import { PowerSwitch } from "./PowerSwitch";
import Subtitle from "../Subtitle";
import { ColumnUsageIndicator } from "./ColumnUsageIndicator";

export type DeviceTileProps = {
  background?: string;
  name: string;
  activeSince?: number;
  currentConsumption?: number;
  lastConsumption?: number;
  small?: boolean;
  size?: number;
  margin?: { right?: number, left?: number }
};

export function DeviceTile({
  background,
  name,
  activeSince,
  currentConsumption,
  lastConsumption,
  small,
  size,
  margin,
}: DeviceTileProps) {
  const { tileColor, lightTextColors, defaultColors } = useColors();

  const [power, setPower] = useState(false);

  const styles = useMemo(() => StyleSheet.create({
    tile: {
      borderRadius: 15,
      backgroundColor: power
        ? defaultColors["green"][6]
        : background ?? tileColor,
      padding: 15,
      height: small ? '100%' : undefined,
      justifyContent: small ? 'space-between' : undefined,
      // marginRight: margin?.right,
      // marginLeft: margin?.left,
    },
    header: {
      display: 'flex',
      flexDirection: small ? 'column' : "row",
      gap: 10,
      alignItems: small ? 'flex-start' : "center",
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
    container: {
      paddingRight: margin?.right,
      paddingLeft: margin?.left,
      width: '100%',

    }
  }), [background, tileColor, power, margin]);
  if (small) {
    return (
      <View style={styles.container}>
        <View style={styles.tile}>
          <View style={styles.header}>
            <PowerSwitch
              power={power}
              onPress={() => {
                setPower((p) => !p);
              }}
            />
          </View>
          <View style={styles.text}>
            {(power && activeSince) && (
              <Subtitle
                color={power ? lightTextColors[1] : undefined}
                order={5}
              >
                {`Włączony od: ${Math.floor(activeSince / 60)}h ${activeSince % 60
                  }min`}
              </Subtitle>
            )}
            <Title lightText={power} color={0} order={2}>
              {name}
            </Title>
          </View>
        </View>
      </View>
    )
  }

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
            {(power && activeSince) && (
              <Subtitle
                color={power ? lightTextColors[0] : undefined}
                order={5}
              >
                {`Włączony od: ${Math.floor(activeSince / 60)}h ${activeSince % 60
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
