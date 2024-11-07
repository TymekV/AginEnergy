import { DefaultColor, useColors } from "@lib/hooks";
import { Icon } from "@tabler/icons-react-native";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export type ThemeIconProps = {
    icon: Icon,
    color?: DefaultColor,
    size?: number,
}

export function ThemeIcon({ icon: Icon, color, size }: ThemeIconProps) {
    const { defaultColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            width: size ?? 36,
            height: size ?? 36,
            borderRadius: 999999,
            backgroundColor: defaultColors[color ?? 'green'][8] + '20',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }), [color, size]);

    return (
        <View style={styles.container}>
            {/* TODO: Add icon size calculation */}
            <Icon color={defaultColors[color ?? 'green'][7]} size={24} />
        </View>
    )
}