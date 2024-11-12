import { FloatingButton, ThemeIcon, Tile, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import { IconBolt, IconGraph, IconPlus } from "@tabler/icons-react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { LineChart } from "react-native-gifted-charts";
import DevicesGrid from "@lib/components/devices/DevicesGrid";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import { SheetManager } from "react-native-actions-sheet";
import { DevicesContext } from "@lib/providers/DevicesProvider";
import { SocketContext } from "@lib/providers/SocketProvider";
import ChartTile from "@lib/components/devices/ChartTile";

const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

export default function Home() {
    const { colors, textColors, backgroundColor } = useColors();
    const [refreshing, setRefreshing] = useState(false);
    const { devices, setDevices, refreshDevices } = useContext(DevicesContext);

    const socketData = useContext(SocketContext);
    const [chartdata, setChartData] = useState<{ value: number }[]>([]);
    const [chartDataType, setchartDataType] = useState<string>('power');
    const [usageIndicatorValue, setUsageIndicatorValue] = useState('0');
    const [prevValue, setPrevValue] = useState(0);


    useEffect(() => {
        if (!socketData || !chartDataType) return;
        // const socketDevice = socketData.map((m) => m.find((f) => f.id == device?.id));

        const chartdata: { value: number }[] = socketData.map((s) => {
            //@ts-ignore
            let value = 0; s.map((m) => { m?.power == undefined ? value += parseFloat(m?.power) : value += 0 });
            return {
                value: Math.round(value * 100) / 100
            };
        });
        console.log(chartdata);


        setChartData(chartdata);
        //@ts-check
        let unit;
        if (chartDataType == 'power') {
            unit = 'W';
        }
        else if (chartDataType == 'current') {
            unit = 'A';
        }
        if (chartDataType == 'temperature') {
            unit = '°C';
        }
        if (chartDataType == 'voltage') {
            unit = 'V';
        }

        setUsageIndicatorValue((chartdata[chartdata.length - 1]?.value?.toString() || '0') + ' ' + unit);

    }, [socketData, chartDataType])

    const styles = useMemo(() => StyleSheet.create({
        container: {
            backgroundColor,
            flex: 1,
        },
        content: {
            padding: 25,
            // paddingTop: 50,
            paddingTop: 10,
            gap: 15,
            paddingBottom: 100,
        },
        topSection: {
            gap: 15,
        },
    }), [backgroundColor]);

    // useEffect(() => {
    //     (async () => {
    //         // console.log('Requesting location permission');
    //         // const { status } = await Location.requestForegroundPermissionsAsync();

    //         // console.log({ status });

    //         // const ssid = await WifiManager.getCurrentWifiSSID();
    //         // console.log({ ssid });

    //         await WifiManager.connectToProtectedWifiSSID({
    //             ssid: 'WtyczkaTauron_AP',
    //             password: 'AginPlug',
    //         });
    //     })();
    // }, []);

    return (
        <>
            <FloatingButton icon={IconPlus} onPress={() => SheetManager.show('addPlug')} />
            <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await refreshDevices(() => setRefreshing(false)); }} />}>
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
                            <ChartTile
                                chartDataArray={chartdata}
                                icon={IconBolt}
                                label={"Bieżące zużucie:"}
                                usageIndicatorValue={usageIndicatorValue} />
                        </View>
                        <DevicesGrid />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
