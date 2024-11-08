import { ThemeIcon, Tile, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import {
    IconBolt,
    IconGraph,
    IconLayoutGrid,
    IconPower,
} from "@tabler/icons-react-native";
import { useMemo } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { LineChart } from "react-native-gifted-charts";
import { DeviceTile } from "@lib/components/devices/DeviceTile";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";

const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

export default function Devices() {
    const { colors, textColors, backgroundColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            backgroundColor,
            flex: 1,
        },
        content: {
            padding: 25,
            paddingTop: 10,
        },
        topSection: {
            gap: 15,
        },
    }), [backgroundColor]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
                <View style={styles.content}>
                    <View style={styles.topSection}>
                        <Title icon={IconLayoutGrid}>Urządzenia</Title>
                        <Tile
                            withHeader
                            headerLabel={
                                <>
                                    <ThemeIcon icon={IconPower} />
                                    <InlineUsageIndicator
                                        label="Aktywne urządzenia:"
                                        value="3/5"
                                    />
                                </>
                            }
                        />
                        <DeviceTile name="Telewizor" activeSince={86} />
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
