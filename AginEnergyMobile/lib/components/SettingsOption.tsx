import { useColors } from "@lib/hooks"
import { useMemo } from "react";
import { StyleSheet, TextStyle, TouchableHighlight, TouchableHighlightProps, View, ViewProps, ViewStyle } from "react-native";
import { Title } from "./Title";

export type OptionTheme = 'normal' | 'danger';

export interface SettingsOptionProps extends TouchableHighlightProps {
    label: string,
    description?: string,
    theme?: OptionTheme
}

type ThemeStyles = {
    container: ViewStyle;
    label?: {
        color?: String,
    },
    description?: {
        color?: String,
    },
};

type OptionThemes = Record<OptionTheme, ThemeStyles>;

export default function SettingsOption({ label, description, theme = 'normal', ...props }: SettingsOptionProps) {
    const { tileColor, textColors, defaultColors } = useColors();

    const themes = useMemo<OptionThemes>(() => ({
        normal: {
            container: {
                backgroundColor: tileColor,
            },
        },
        danger: {
            container: {
                backgroundColor: defaultColors.red[8] + 20,
            },
            label: {
                color: defaultColors.red[6],
            },
            description: {
                color: defaultColors.red[6] + '80',
            },
        },
    }), [defaultColors]);

    const themeStyles = themes[theme];

    const styles = useMemo(() => StyleSheet.create({
        container: {
            borderRadius: 15,
            paddingHorizontal: 20,
            paddingVertical: 15,
            ...themeStyles.container,
        },
        touchable: {
            borderRadius: 15,
        }
    }), [tileColor, themeStyles]);

    return (
        <TouchableHighlight style={styles.touchable} {...props}>
            <View style={styles.container}>
                <Title order={2} fontFamily="Poppins-SemiBold" color={themeStyles.label?.color as string}>{label}</Title>
                {description && <Title order={3} color={themeStyles.description?.color as string ?? textColors[1]} fontFamily="Poppins-Regular">{description}</Title>}
            </View>
        </TouchableHighlight>
    )
}