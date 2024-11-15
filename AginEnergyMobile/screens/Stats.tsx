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
import { lineDataItem } from "react-native-gifted-charts";

export type Timestats = {
    yesterday: {
        sortable: lineDataItem[],
        sum: string
    },
    hour: {
        sortable: lineDataItem[],
        sum: string
    }
}


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

    const [hungryDevices, setHungryDevices] = useState<Record<string, string>>({})

    const [timestats, setTimeStats] = useState<Timestats>();

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

    }, [socketData, chartDataType]);



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

    async function updateData(onEnd?: () => void) {
        const hungrydevicesdata = await api?.get('/plugs/stats/all').catch((e) => { onEnd?.() });
        setHungryDevices(hungrydevicesdata?.data);
        const timestatsdata = await api?.get('/timestats').catch((e) => { onEnd?.() });
        setTimeStats(timestatsdata?.data);
        onEnd?.();
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
            <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
                <ScrollView contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await updateData(() => setRefreshing(false)); }} />}>
                    <View style={styles.content}>
                        <View style={styles.topSection}>
                            <Title icon={IconGraph}>Statystyki</Title>
                            <ChartTile
                                chartDataArray={timestats?.hour.sortable == undefined ? [{ value: 0 }] : timestats?.hour.sortable}
                                chartDataArray2={timestats?.yesterday.sortable == undefined ? [{ value: 0 }] : timestats?.yesterday.sortable}
                                legend={[{ color: colors[6], backgroundColor: colors[1], legend: 'Ostatnia godzina:', value: timestats?.hour?.sum + ' Wh' },
                                { color: defaultColors.blue[6], legend: 'Ostatnie 24h:', backgroundColor: defaultColors.blue[1], value: timestats?.yesterday?.sum + ' Wh' }]}
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
                                        label="Urządzenia zużywajace najwięcej energii z ostatnich 24h:"
                                    />
                                </>
                            }
                        >
                            <View style={{ paddingTop: 0, width: '100%', paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 10, }}>

                                {Object.keys(hungryDevices).reverse().map((h) => {
                                    const device = devices.find((f) => f.id == h); return <Tile
                                        withHeader
                                        background={defaultColors.red[1]}
                                        headerLabel={
                                            <>
                                                <ThemeIcon icon={IconDevicesBolt} color="red" />
                                                <InlineUsageIndicator
                                                    color="red"
                                                    label={device?.label}
                                                    value={hungryDevices[h] + ' Wh'}
                                                />
                                            </>
                                        }
                                    />
                                })}
                            </View>

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
