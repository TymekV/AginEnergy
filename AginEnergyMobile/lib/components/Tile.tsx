import { useColors } from "@lib/hooks";
import { Icon } from "@tabler/icons-react-native";
import React, { useMemo } from "react"
import { StyleSheet, View } from "react-native";

export type TileProps = {
    background?: string,
    children?: React.ReactNode,
    withHeader?: boolean,
    headerLabel?: React.ReactNode,
}

export function Tile({ background, children, withHeader, headerLabel }: TileProps) {
    const { tileColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        tile: {
            borderRadius: 15,
            backgroundColor: background ?? tileColor,
        },
        header: {
            padding: 15,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        }
    }), [background, tileColor]);

    return (
        <View style={styles.tile}>
            {withHeader && <View style={styles.header}>
                {headerLabel}
            </View>}
            {children}
        </View>
    )
}