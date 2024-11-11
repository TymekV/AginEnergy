import { useColors } from "@lib/hooks";
import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View, ViewProps } from "react-native";
import { Icon, IconCheck } from "@tabler/icons-react-native";

export interface SheetInlineActionProps extends TouchableHighlightProps {
    icon?: Icon;
    label?: string;
    selected?: boolean;
    iconColor?: string;
    destructive?: boolean;
    textColor?: string;
}

export default function SheetInlineAction({ icon: Icon, label, selected, iconColor, destructive, textColor, ...props }: SheetInlineActionProps) {

    const { textColors, sheetActionBackgroundColor, iconColors, defaultColors } = useColors();
    const styles = useMemo(() => StyleSheet.create({
        inlineAction: {
            backgroundColor: sheetActionBackgroundColor,
            borderRadius: 12,

            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 12,
            paddingHorizontal: 22,
            paddingVertical: 18,
        },
        inlineActionLeft: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 12,
        },
        inlineActionText: {
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            textAlign: 'left',
            color: textColors[0],
        },
        inlineTouchable: {
            borderRadius: 12,
            marginTop: 12,
        },
    }), [textColors, sheetActionBackgroundColor]);
    return (
        <TouchableHighlight style={styles.inlineTouchable} {...props}>
            <View style={styles.inlineAction}>
                <View style={styles.inlineActionLeft}>
                    {!!Icon && <Icon color={iconColor || (destructive ? defaultColors.red[4] : iconColors[0])} size={24} />}
                    <Text style={[styles.inlineActionText, textColor ? { color: textColor } : destructive ? { color: defaultColors.red[4] } : {}]}>{label}</Text>
                </View>
                <IconCheck size={20} color={iconColors[0]} style={{ opacity: selected ? 1 : 0 }} />
            </View>
        </TouchableHighlight>
    )
}
