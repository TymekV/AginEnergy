import { ThemeIcon, Tile, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import { IconLayoutGrid, IconPower, } from "@tabler/icons-react-native";
import { useContext, useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { InlineUsageIndicator } from "@lib/components/InlineUsageIndicator";
import { DeviceTile } from "@lib/components/devices/DeviceTile";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import { DevicesContext, DevicesContextType, DevicesStateType, DeviceStateType } from "@lib/providers/DevicesProvider";
import useApi from "@lib/hooks/useApi";

const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

export default function Devices() {
    const { colors, textColors, backgroundColor } = useColors();
    const { devices, setDevices } = useContext(DevicesContext);
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

    return (
        <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
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
                                            value="3/5"
                                        />
                                    </>
                                }
                            />
                            {devices?.map((d: DeviceStateType, i: number) => <DeviceTile id={d?.id} key={i} power={d?.on} name={d?.label} activeSince={86} setPower={() => { api?.patch(`/plugs/${d.id}`, { on: d?.on ? 'false' : 'true' }).catch((e) => console.log(e)); setDevices((s: DevicesStateType) => { const newArr = [...s]; newArr[i].on = !d?.on; return newArr; }) }} />)}

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
