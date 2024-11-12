import { DefaultColor, TextColorIndex, useColors } from "@lib/hooks";
import { Font } from "@lib/types";
import { Icon } from "@tabler/icons-react-native";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontWeight } from "react-native-svg";

export type TitleProps = {
    children?: React.ReactNode;
    order?: 1 | 2 | 3;
    color?: TextColorIndex | string;
    lightText?: boolean;
    fontFamily?: Font;
    icon?: Icon;
    onIconPress?: () => void;
    iconColor?: DefaultColor;
    iconSize?: number;
    textAlign?: 'left' | 'center' | 'right';
    rightButtonIcon?: Icon;
};

export function Title({ order, color, lightText, fontFamily, children, icon: Icon, iconColor, iconSize, textAlign, onIconPress, rightButtonIcon: RightIcon }: TitleProps) {
    const sizes = {
        1: 20,
        2: 15,
        3: 12,
    };

    const { textColors, lightTextColors, defaultColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        title: {
            fontSize: sizes[order ?? 1],
            fontFamily: fontFamily ?? "Poppins-Medium",
            color: typeof color == "number" ? (lightText ? lightTextColors : textColors)[color ?? 0] : color,
            textAlign,
        },
        container: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-between',
        },
        left: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
        },
        iconWrapper: {
            width: iconSize ?? 36,
            height: iconSize ?? 36,
            borderRadius: 999999,
            backgroundColor: defaultColors[iconColor ?? "green"][8] + "20",
            justifyContent: "center",
            alignItems: "center",
        },
    }), [order, color, lightText, fontFamily, textAlign]);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                {Icon && (
                    <TouchableOpacity onPress={onIconPress}>
                        <View style={styles.iconWrapper}>
                            <Icon color={defaultColors[iconColor ?? "green"][7]} size={24} />
                        </View>
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{children}</Text>
            </View>
            {RightIcon && <TouchableOpacity onPress={onIconPress}>
                <View style={styles.iconWrapper}>
                    <RightIcon color={defaultColors[iconColor ?? "green"][7]} size={24} />
                </View>
            </TouchableOpacity>}
        </View>
    );
}
