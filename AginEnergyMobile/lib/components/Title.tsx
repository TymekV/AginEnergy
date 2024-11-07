import { TextColorIndex, useColors } from "@lib/hooks";
import { Font } from "@lib/types";
import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export type TitleProps = {
    children?: React.ReactNode,
    order?: 1 | 2 | 3,
    color?: TextColorIndex,
    lightText?: boolean,
    fontFamily?: Font,
}

export function Title({ order, color, lightText, fontFamily, children }: TitleProps) {
    const sizes = {
        1: 20,
        2: 15,
        3: 11,
    };

    const { textColors, lightTextColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        title: {
            fontSize: sizes[order ?? 1],
            fontFamily: fontFamily ?? 'Poppins-Medium',
            color: (lightText ? lightTextColors : textColors)[color ?? 0],
        }
    }), [order, color, lightText, fontFamily]);

    return (
        <Text style={styles.title}>
            {children}
        </Text>
    )
}