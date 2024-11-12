import { useColors } from "@lib/hooks";
import React, { useMemo, useState } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { Title } from "../Title";
import { PowerSwitch } from "./PowerSwitch";
import Subtitle from "../Subtitle";
import { ColumnUsageIndicator } from "./ColumnUsageIndicator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingParams } from "@lib/navigators";

export type DeviceTileProps = {
    background?: string;
    name: string;
    id: string;
    activeSince?: number;
    currentConsumption?: number;
    lastConsumption?: number;
    small?: boolean;
    size?: number;
    power?: boolean;
    setPower?: any;
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
    id,
    power,
    setPower,
    margin,
}: DeviceTileProps) {
    const { tileColor, lightTextColors, defaultColors } = useColors();
    const navigator = useNavigation<NavigationProp<OnboardingParams>>();

    const styles = useMemo(() => StyleSheet.create({
        tile: {
            borderRadius: 15,
            backgroundColor: power
                ? defaultColors["green"][7]
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

    function onPress(e?: GestureResponderEvent) {
        navigator.navigate('DeviceDetails', { id: id })
    }
    if (small) {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.tile}>
                        <View style={styles.header}>
                            <PowerSwitch
                                power={power}
                                onPress={(e) => {
                                    setPower();
                                    e.stopPropagation();
                                }}
                            />
                        </View>
                        <View style={styles.text}>
                            {(power && activeSince) && (
                                <Subtitle
                                    color={power ? lightTextColors[1] : undefined}
                                    order={5}
                                >
                                    {`Włączony od: ${Math.floor(activeSince / 60)}h ${activeSince % 60}min`}
                                </Subtitle>
                            )}
                            <Title lightText={power} color={0} order={2}>
                                {name}
                            </Title>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.tile}>
            <TouchableOpacity onPress={onPress}>

                {
                    <View style={styles.header}>
                        <PowerSwitch
                            power={power}
                            onPress={(e) => {
                                e.stopPropagation();
                                setPower();
                            }}
                        />
                        <View style={styles.text}>
                            <Title lightText={power} color={0} order={2}>
                                {name}
                            </Title>
                            {(power && activeSince) && (
                                <Subtitle
                                    color={power ? lightTextColors[1] : undefined}
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
                        value={lastConsumption + " Wh"}
                        color="green"
                        lightText={power}
                    />
                    {power && (
                        <ColumnUsageIndicator
                            label="Bieżące zużycie:"
                            value={currentConsumption + ' W'}
                            color="orange"
                            lightText={power}
                        />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}
