import { DefaultColor, useColors } from "@lib/hooks";
import { Icon } from "@tabler/icons-react-native";
import { useMemo } from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native";

export type ThemeIconProps = {
    icon: Icon;
    color?: DefaultColor;
    size?: number;
    stirngColor?: string;
    stirngColorBackground?: string;
    onPress?: (e: GestureResponderEvent) => void;
    pressDisabled?: boolean;
};

export function ThemeIcon({ icon: Icon, color, size, onPress, pressDisabled, stirngColor }: ThemeIconProps) {
    const { defaultColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            width: size ?? 36,
            height: size ?? 36,
            borderRadius: 999999,
            backgroundColor: stirngColor ? stirngColor + "30" : defaultColors[color ?? "green"][8] + "20",
            justifyContent: "center",
            alignItems: "center",
        },
    }), [color, size, stirngColor]);

    return (
        <TouchableOpacity onPress={onPress} disabled={!onPress}>
            <View style={styles.container}>
                {/* TODO: Add icon size calculation */}
                <Icon color={stirngColor ? stirngColor : defaultColors[color ?? "green"][7]} size={24} />
            </View>
        </TouchableOpacity>
    );
}
