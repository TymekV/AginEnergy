import { Floating, FloatingPosition } from "@lib/components";
import { useColors } from "@lib/hooks";
import { blendColors } from "@lib/util";
import { Icon } from "@tabler/icons-react-native";
import { Platform, StyleSheet, TouchableHighlight, TouchableHighlightProps, View } from "react-native";

export interface FloatingButtonProps extends FloatingButtonContentProps {
    position?: FloatingPosition,
}

export function FloatingButton({ position, ...props }: FloatingButtonProps) {
    return (
        <>
            <Floating position={{
                right: 15,
                bottom: (Platform.OS != 'ios' ? 85 : 95) + 20,
                ...position,
            }}>
                <FloatingButtonContent {...props} />
            </Floating>
        </>
    )
}

export interface FloatingButtonContentProps extends TouchableHighlightProps {
    icon: Icon,
    wh?: number,
    theme?: 'default' | 'secondary',
    iconSize?: number,
}

export function FloatingButtonContent({ icon: Icon, wh, theme, iconSize, ...props }: FloatingButtonContentProps) {
    const { backgroundColor, colors, iconColors, lightTextColors } = useColors();
    const themes = {
        secondary: {
            backgroundColor: blendColors(colors[8], backgroundColor, .2),
            color: colors[6],
        },
        default: {
            backgroundColor: colors[8],
            color: lightTextColors[0],
        }
    };
    return (
        <TouchableHighlight style={styles.touchable} {...props}>
            <View style={[styles.button, {
                width: wh ?? 48,
                height: wh ?? 48,
            }, themes[theme ?? 'default']]}>
                <Icon color={themes[theme ?? 'default']?.color || iconColors[0]} size={iconSize ?? 22} />
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 99999,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    touchable: {
        borderRadius: 99999,
    }
});