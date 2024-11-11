import { ThemeIcon, Tile, Title } from "@lib/components";
import { PowerSwitch } from "@lib/components/devices/PowerSwitch";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import { useColors } from "@lib/hooks";
import { OnboardingParams } from "@lib/navigators";
import { DevicesContext, DevicesStateType, DeviceStateType } from "@lib/providers/DevicesProvider";
import { SocketContext, TPlugData } from "@lib/providers/SocketProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconBolt, IconChevronLeft, IconGraph } from "@tabler/icons-react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LineChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [{ value: 15.12 }, { value: 30.23 }, { value: 26.12 }, { value: 40.67 }];

export type DeviceParams = {
    id: string
}

export type DeviceDetailsParams = NativeStackScreenProps<OnboardingParams,
    'DeviceDetails'>;

export default function DeviceDetails({ route }: DeviceDetailsParams) {
    const { colors, textColors, backgroundColor } = useColors();
    const [devices, setDevices]: any = useContext(DevicesContext);
    const [device, setDevice] = useState<DeviceStateType>();
    const [deviceIndex, setDeviceIndex] = useState<number>(-1);
    const { id } = route.params;
    const navigator = useNavigation();
    const { defaultColors } = useColors();
    const socketData = useContext(SocketContext);
    const [socketDevice, setSocketDevice] = useState<(TPlugData | undefined)[]>([]);
    const [width, setWidth] = useState(100);
    const [chartdata, setChartData] = useState<{ value: number }[]>([]);

    useEffect(() => {
        setDevice(devices.find((d: DeviceStateType) => d.id == id));
        setDeviceIndex(devices.findIndex((d: DeviceStateType) => d.id == id));
        console.log("dev", device);
    }, [])

    useEffect(() => {
        if (!device) return
        const socketDevice = socketData.map((m) => m.find((f) => f.id == device?.id))
        setSocketDevice(socketDevice);

        //@ts-ignore
        const chartdata: { value: number }[] = socketDevice.map((s) => ({ value: parseFloat(s?.power) || 0 }))
        setChartData(chartdata);
        // console.log(chartdata);
        //@ts-check


    }, [device, socketData])

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

    return (
        <>
            <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.content}>
                        <View style={styles.topSection}>
                            <Title onIconPress={() => navigator.goBack()} icon={IconChevronLeft}>{device?.label}</Title>
                            <Tile
                                background={device?.power ? defaultColors["green"][7] : undefined}
                                withHeader
                                onPress={() => setDevices((d: DevicesStateType) => { const newArr = [...d]; if (deviceIndex == -1) { return newArr; } newArr[deviceIndex].power = !device?.power; return newArr; })}
                                headerLabel={
                                    <>
                                        <PowerSwitch power={device?.power} />
                                        {/* <InlineUsageIndicator
                                            color="green"
                                            label="Trend zużycia:"
                                            value="Dobry"
                                        /> */}
                                        <Title lightText={device?.power} order={2} color={0} >{device?.power ? 'Włączony' : 'Wyłączony'}</Title>
                                    </>
                                }
                            />
                            <Tile
                                withHeader
                                onLayout={(o) => {
                                    // console.log(o.nativeEvent.layout.width);
                                    setWidth(o.nativeEvent.layout.width)
                                }}
                                headerLabel={
                                    <>
                                        <ThemeIcon icon={IconBolt} />
                                        <InlineUsageIndicator
                                            color="orange"
                                            label="Bieżące zużycie:"
                                            value={socketDevice[socketDevice.length - 1]?.power?.toString() + ' W' || '0 W'}
                                        />
                                    </>
                                }
                            >
                                <LineChart
                                    data={chartdata}
                                    areaChart
                                    spacing={chartdata.length > 0 ? (width - 10) / chartdata.length - 1 : undefined}
                                    // width={width - 60}
                                    // rulesLength={width - 10}
                                    initialSpacing={0}
                                    endSpacing={0}
                                    color={colors[6]}
                                    startFillColor={colors[4]}
                                    yAxisThickness={0}
                                    xAxisThickness={0}
                                    xAxisLabelTextStyle={{
                                        color: textColors[2],
                                    }}
                                    disableScroll

                                    dataPointsColor={colors[4]}
                                />
                            </Tile>
                        </View>
                        <Title order={2}>Historia zużycia:</Title>
                        <Tile
                            withHeader
                            headerLabel={
                                <>
                                    <ThemeIcon icon={IconBolt} />
                                    <InlineUsageIndicator
                                        color="orange"
                                        label="Ostatnie pierdylion lat:"
                                        value="430MWh"
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
                </ScrollView>
            </SafeAreaView>
        </>
    );
}