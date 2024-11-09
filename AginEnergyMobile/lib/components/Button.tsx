import { useColors } from "@lib/hooks";
import { useMemo } from "react";
import { StyleSheet, Text, TextStyle, TouchableHighlight, TouchableHighlightProps, View, ViewStyle } from "react-native";

export type ButtonTheme = 'primary' | 'secondary';

export interface ButtonProps extends TouchableHighlightProps {
    children?: React.ReactNode;
    theme?: ButtonTheme;
}

type ThemeStyles = {
    button: ViewStyle;
    label: TextStyle;
};

type ButtonThemes = Record<ButtonTheme, ThemeStyles>;

export function Button({ children, theme = 'primary', style, ...props }: ButtonProps) {
    const { colors, lightTextColors } = useColors();

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
                color: 'black',
                fontSize: 16,
            },
        }
    }), [colors]);

    const themeStyles = themes[theme];

    const styles = useMemo(() => StyleSheet.create({
        button: {
            flexDirection: 'row',
            justifyContent: 'center',
            ...themeStyles.button,
            ...style as ViewStyle,
        },
        label: {
            ...themeStyles.label,
        },
        touchable: {
            borderRadius: 999999,
        }
    }), [themeStyles, style]);

    return (
        <TouchableHighlight style={styles.touchable} {...props}>
            <View style={[styles.button, style]}>
                <Text style={styles.label}>{children}</Text>
            </View>
        </TouchableHighlight>
    );
}
