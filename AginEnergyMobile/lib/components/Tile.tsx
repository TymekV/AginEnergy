import { useColors } from "@lib/hooks";
import { Icon } from "@tabler/icons-react-native";
import React, { useMemo } from "react"
import { StyleSheet, View, ViewProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface TileProps extends ViewProps {
    background?: string,
    children?: React.ReactNode,
    withHeader?: boolean,
    headerLabel?: React.ReactNode,
    onPress?: () => void,
    withPadding?: boolean
}

export function Tile({ background, children, withHeader, headerLabel, onPress, withPadding, ...props }: TileProps) {
    const { tileColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        tile: {
            borderRadius: 15,
            backgroundColor: background ?? tileColor,
            // width: '100%',
            padding: withPadding ? 15 : 0,
        },
        header: {
            padding: withPadding ? 0 : 15,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            paddingBottom: withPadding ? 10 : 15,
        }
    }), [background, tileColor, withPadding]);

    return (
        <TouchableOpacity disabled={!onPress} onPress={onPress}>
            <View {...props} style={styles.tile}>
                {withHeader && <View style={styles.header}>
                    {headerLabel}
                </View>}
                {children}
            </View>
        </TouchableOpacity >
    )
}