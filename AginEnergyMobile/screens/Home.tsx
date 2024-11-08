import { FloatingButton, ThemeIcon, Tile, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import { IconBolt, IconGraph, IconPlus } from "@tabler/icons-react-native";
import { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { LineChart } from "react-native-gifted-charts";
import DevicesGrid from "@lib/components/devices/DevicesGrid";

const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

export default function Home() {
  const { colors, textColors, backgroundColor } = useColors();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor,
          flex: 1,
        },
        content: {
          padding: 25,
          paddingTop: 50,
          gap: 15,
          paddingBottom: 100,
        },
        topSection: {
          gap: 15,
        },
      }),
    [backgroundColor]
  );

  return (
    <>
      <FloatingButton icon={IconPlus} />
      <ScrollView >
        <SafeAreaView>
          <View style={styles.content}>
            <View style={styles.topSection}>
              <Title>Witamy, Tymek!</Title>
              <Tile
                withHeader
                headerLabel={
                  <>
                    <ThemeIcon icon={IconGraph} />
                    <InlineUsageIndicator
                      color="green"
                      label="Trend zużycia:"
                      value="Dobry"
                    />
                  </>
                }
              />
              <Tile
                withHeader
                headerLabel={
                  <>
                    <ThemeIcon icon={IconBolt} />
                    <InlineUsageIndicator
                      color="orange"
                      label="Bieżące zużycie:"
                      value="430W"
                    />
                  </>
                }
              >
                <LineChart
                  data={data}
                  isAnimated
                  color={colors[6]}
                  // hideAxesAndRules
                  yAxisThickness={0}
                  xAxisThickness={0}
                  // curved
                  // curvature={.15}
                  xAxisLabelTextStyle={{
                    color: textColors[2],
                  }}
                  dataPointsColor={colors[4]}
                  textShiftX={0}
                  textShiftY={-6}
                />
              </Tile>
            </View>
            <DevicesGrid />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
