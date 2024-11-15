import { DefaultColor, StatusColors, useColors } from "@lib/hooks";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "./Title";

export type InlineUsageIndicatorProps = {
    label?: string;
    value?: string;
    description?: string;
    color?: StatusColors;
    stringColor?: string;
    maxTextWidth?: number;
};

export function InlineUsageIndicator({
    label,
    value,
    description,
    color,
    stringColor,
    maxTextWidth,
}: InlineUsageIndicatorProps) {
    const { defaultColors, textColors, statusColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: "row",
            gap: 5,
        },
    }), []);

    return (
        <View style={styles.container} >
            <Title maxTextWidth={maxTextWidth} order={2}>{label}</Title>
            <View>
                <Title
                    order={2}
                    color={color ? statusColors[color][1] : stringColor ? stringColor : textColors[0]}
                    fontFamily="Poppins-Bold"
                >
                    {value}
                </Title>
            </View>
        </View >
    );
}
