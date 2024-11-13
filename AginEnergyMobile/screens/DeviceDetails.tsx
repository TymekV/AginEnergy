import { ThemeIcon, Tile, Title } from "@lib/components";
import ChartTile from "@lib/components/devices/ChartTile";
import { PowerSwitch } from "@lib/components/devices/PowerSwitch";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import { useColors } from "@lib/hooks";
import useApi from "@lib/hooks/useApi";
import { OnboardingParams } from "@lib/navigators";
import { DevicesContext, DevicesStateType, DeviceStateType } from "@lib/providers/DevicesProvider";
import { SocketContext, TPlugData } from "@lib/providers/SocketProvider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IconBolt, IconChevronLeft, IconDots, IconGraph } from "@tabler/icons-react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
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
    const { devices, setDevices } = useContext(DevicesContext);
    const [device, setDevice] = useState<DeviceStateType>();
    const [deviceIndex, setDeviceIndex] = useState<number>(-1);
    const { id } = route.params;
    const navigator = useNavigation();
    const { defaultColors } = useColors();
    const [width, setWidth] = useState(100);
    const api = useApi();

    const socketData = useContext(SocketContext);
    const [chartdata, setChartData] = useState<{ value: number }[]>([]);
    const [chart2data, setChart2Data] = useState<{ chartData: { value: number }[], Wh: number }>({ chartData: [], Wh: 0 });
    const [chartDataType, setchartDataType] = useState<string>('power');
    const [chart2DataType, setchart2DataType] = useState<string>('power');
    const [usageIndicatorValue, setUsageIndicatorValue] = useState('0');
    const [usageIndicator2Value, setUsageIndicator2Value] = useState('0');

    useEffect(() => {
        if (!id) return;
        setDevice(devices.find((d: DeviceStateType) => d.id == id));
        setDeviceIndex(devices.findIndex((d: DeviceStateType) => d.id == id));
        console.log("dev", device);
    }, [id])

    useEffect(() => {
        if (!id || !chart2DataType) return;
        (async () => {
            const chart2data = await api?.get(`/plugs/stats/${id}`, { params: { measurement: chart2DataType } });
            // console.log(chart2data?.data);

            setChart2Data(chart2data?.data);
            let unit;
            if (chart2DataType == 'power') {
                unit = 'Wh';
            }
            else if (chart2DataType == 'current') {
                unit = 'Ah';
            }
            if (chart2DataType == 'temperature') {
                unit = '°C średnio';
            }
            if (chart2DataType == 'voltage') {
                unit = 'V średnio';
            }
            setUsageIndicator2Value(chart2data?.data?.mean.toString() + ' ' + unit);
        })();
    }, [id, chart2DataType])


    useEffect(() => {
        if (!device || !socketData || !chartDataType) return;
        const socketDevice = socketData.map((m) => m.find((f) => f.id == device?.id));
        if (socketDevice[socketDevice.length - 1] == undefined) {
            socketDevice.pop();
        }


        //@ts-ignore
        const chartdata: { value: number }[] = socketDevice.map((s) => ({ value: parseFloat(s?.[chartDataType]) || 0 }));
        setChartData(chartdata);
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

    }, [device, socketData, chartDataType])

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
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.content}>
                        <View style={styles.topSection}>
                            <Title onIconPress={() => navigator.goBack()} icon={IconChevronLeft} rightButtonIcon={IconDots} onRightIconPress={() => SheetManager.show('colorPicker', { payload: { initial: { r: 255, g: 0, b: 0 } } })}>{device?.label}</Title>
                            <Tile
                                background={device?.on ? defaultColors["green"][7] : undefined}
                                withHeader
                                onPress={() => { api?.patch(`/plugs/${device?.id}`, { on: device?.on ? 'false' : 'true' }).catch((e) => console.log(e)); setDevices((d: DevicesStateType) => { const newArr = [...d]; if (deviceIndex == -1) { return newArr; } newArr[deviceIndex].on = !device?.on; return newArr; }) }}
                                headerLabel={
                                    <>
                                        <PowerSwitch power={device?.on} />
                                        {/* <InlineUsageIndicator
                                            color="green"
                                            label="Trend zużycia:"
                                            value="Dobry"
                                        /> */}
                                        <Title lightText={device?.on} order={2} color={0} >{device?.on ? 'Włączony' : 'Wyłączony'}</Title>
                                    </>
                                }
                            />
                            {device?.on && <ChartTile
                                chartDataArray={chartdata}
                                chartDataType={chartDataType}
                                setChartDataType={setchartDataType}
                                icon={IconBolt}
                                label={"Bieżąca wartość:"}
                                usageIndicatorValue={usageIndicatorValue} />}
                        </View>
                        <Title order={2}>Historia zużycia:</Title>
                        <ChartTile
                            chartDataArray={chart2data?.chartData}
                            label="Ostatnie 24h:"
                            chartDataType={chart2DataType}
                            setChartDataType={setchart2DataType}
                            icon={IconBolt}
                            usageIndicatorValue={usageIndicator2Value} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}