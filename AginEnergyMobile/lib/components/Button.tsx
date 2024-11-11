import { useColors } from "@lib/hooks";
import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, TextStyle, TouchableHighlight, TouchableHighlightProps, View, ViewStyle } from "react-native";

export type ButtonTheme = 'primary' | 'secondary';

export interface ButtonProps extends TouchableHighlightProps {
    children?: React.ReactNode;
    theme?: ButtonTheme;
    disabled?: boolean;
    loading?: boolean;
}

type ThemeStyles = {
    button: ViewStyle;
    label: TextStyle;
};

type ButtonThemes = Record<ButtonTheme, ThemeStyles>;

export function Button({ children, theme = 'primary', style, disabled = false, loading = false, ...props }: ButtonProps) {
    const { colors, defaultColors, lightTextColors } = useColors();

    const themes = useMemo<ButtonThemes>(() => ({
        primary: {
            button: {
                backgroundColor: colors[9],
                padding: 12,
                borderRadius: 999999,
            },
            label: {
                color: lightTextColors[0],
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold'
            },
        },
        secondary: {
            button: {
                // backgroundColor: colors[9],
                padding: 10,
                borderRadius: 5,
            },
            label: {
                color: colors[9],
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
            },
        }
    }), [colors]);

    const themeStyles = themes[theme];

    const styles = useMemo(() => StyleSheet.create({
        button: {
            flexDirection: 'row',
            justifyContent: 'center',
            ...themeStyles.button,
            ...(disabled && {
                backgroundColor: defaultColors.gray[3],
            }),
            ...style as ViewStyle,
        },
        label: {
            ...themeStyles.label,
            ...(disabled && {
                color: defaultColors.gray[6],
            }),
        },
        touchable: {
            borderRadius: 999999,
        }
    }), [themeStyles, style, disabled]);

    return (
        <TouchableHighlight underlayColor={theme == 'secondary' ? '#ffffff' : undefined} style={styles.touchable} disabled={disabled || loading} {...props}>
            <View style={[styles.button, style]}>
                {loading ? <ActivityIndicator size="small" /> : <Text style={styles.label}>{children}</Text>}
            </View>
        </TouchableHighlight>
    );
}
