import { ThemeIcon, Tile, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import { IconLayoutGrid, IconPower, } from "@tabler/icons-react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { DeviceTile } from "@lib/components/devices/DeviceTile";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import { DevicesContext, DevicesStateType, DeviceStateType } from "@lib/providers/DevicesProvider";
import useApi from "@lib/hooks/useApi";
import { SocketContext } from "@lib/providers/SocketProvider";
import { RefreshControl } from "react-native-gesture-handler";


export default function Devices() {
    const { colors, textColors, backgroundColor } = useColors();
    const { devices, setDevices, refreshDevices } = useContext(DevicesContext);
    const [last24h, setLast24h] = useState<{ [key: string]: number }[]>([])
    const socketData = useContext(SocketContext);
    const [refreshing, setRefreshing] = useState(false);

    const api = useApi();
    const styles = useMemo(() => StyleSheet.create({
        container: {
            backgroundColor,
            flex: 1,
        },
        content: {
            padding: 25,
            paddingTop: 10,
            paddingBottom: 100,
        },
        topSection: {
            gap: 15,
        },
    }), [backgroundColor]);

    async function updateData() {
        const data = await api?.get('/plugs/stats/all');
        setLast24h(data?.data);
    }

    useEffect(() => {
        (async () => {
            await updateData();
        })();
    }, [])

    return (
        <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await updateData(); await refreshDevices(() => setRefreshing(false)); }} />}>
                <View style={styles.container}>
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
                                            value={`${devices.filter((f) => f?.on == true).length}/${devices.length}`}
                                        />
                                    </>
                                }
                            />
                            {devices?.map((d: DeviceStateType, i: number) => {
                                const socketDevice = socketData.map((m) => m.find((f) => f.id == d?.id));
                                if (socketDevice[socketDevice.length - 1] == undefined) {
                                    socketDevice.pop();
                                }
                                //@ts-ignore
                                return <DeviceTile lastConsumption={last24h[d?.id] || 0} currentConsumption={socketDevice[socketDevice.length - 1]?.power} id={d?.id} key={i} power={d?.on} name={d?.label} activeSince={86} setPower={() => { api?.patch(`/plugs/${d.id}`, { on: d?.on ? 'false' : 'true' }).catch((e) => console.log(e)); setDevices((s: DevicesStateType) => { const newArr = [...s]; newArr[i].on = !d?.on; return newArr; }) }} />
                            })}

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
