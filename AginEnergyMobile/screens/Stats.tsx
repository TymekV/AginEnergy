import { FloatingButton, ThemeIcon, Tile, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import { IconBolt, IconDevicesBolt, IconGraph, IconLayoutGrid, IconPlus } from "@tabler/icons-react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import { SheetManager } from "react-native-actions-sheet";
import { DevicesContext } from "@lib/providers/DevicesProvider";
import { SocketContext } from "@lib/providers/SocketProvider";
import ChartTile from "@lib/components/devices/ChartTile";
import useApi from "@lib/hooks/useApi";


export default function Stats() {
    const api = useApi();
    const { colors, textColors, backgroundColor, defaultColors } = useColors();

    const [refreshing, setRefreshing] = useState(false);
    const { devices, setDevices, refreshDevices } = useContext(DevicesContext);

    const socketData = useContext(SocketContext);
    const [chartdata, setChartData] = useState<{ value: number }[]>([]);
    const [chartDataType, setchartDataType] = useState<string>('power');
    const [usageIndicatorValue, setUsageIndicatorValue] = useState('0');

    const [maxTextWidth, setMaxTextWidth] = useState(500);

    const [last24h, setLast24h] = useState<{ [key: string]: number }[]>([])

    useEffect(() => {
        if (!socketData || !chartDataType) return;
        // const socketDevice = socketData.map((m) => m.find((f) => f.id == device?.id));

        const chartdata: { value: number }[] = socketData.map((s) => {
            //@ts-ignore
            let value = 0; s.map((m) => { m?.power ? value += parseFloat(m?.power) : value += 0 });
            return {
                value: Math.round(value * 100) / 100
            };
        });
        chartdata.pop();
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

    async function updateData() {
        const data = await api?.get('/plugs/stats/all');
        setLast24h(data?.data);
    };

    useEffect(() => {
        (async () => {
            await updateData();
        })();
    }, []);

    const arr = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
    const arr2 = [{ value: 30 }, { value: 40 }, { value: 50 }, { value: 20 }];
    return (
        <>
            <FloatingButton icon={IconPlus} onPress={() => SheetManager.show('addPlug')} />
            <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await refreshDevices(() => setRefreshing(false)); }} />}>
                    <View style={styles.content}>
                        <View style={styles.topSection}>
                            <Title icon={IconGraph}>Statystyki</Title>
                            <ChartTile
                                chartDataArray={arr}
                                chartDataArray2={arr2}
                                legend={[{ color: colors[6], legend: 'Dzisiaj' }, { color: defaultColors.blue[6], legend: 'Ostatni tydzień' }]}
                                icon={IconGraph}
                                label={"Trend zużycia:"}
                                usageIndicatorValue={'Dobry'}
                            />
                            {/* <Tile
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
                            /> */}
                        </View>
                        <Tile
                            withHeader
                            withPadding
                            onLayout={(l) => setMaxTextWidth(l.nativeEvent.layout.width - 50)}
                            headerLabel={
                                <>
                                    <ThemeIcon icon={IconLayoutGrid} />
                                    <InlineUsageIndicator
                                        color="green"

                                        maxTextWidth={maxTextWidth}
                                        label="Urządzenia zużywajace najwięcej energii z ostatniech 24h:"
                                    />
                                </>
                            }
                        >
                            <Tile
                                withHeader
                                background={defaultColors.red[1]}
                                headerLabel={
                                    <>
                                        <ThemeIcon icon={IconDevicesBolt} color="red" />
                                        <InlineUsageIndicator
                                            color="red"
                                            label={'Device:'}
                                            value="2 kWh"
                                        />
                                    </>
                                }
                            />
                        </Tile>
                        <ChartTile
                            chartDataArray={chartdata}
                            icon={IconBolt}
                            label={"Bieżące zużucie:"}
                            usageIndicatorValue={usageIndicatorValue} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
