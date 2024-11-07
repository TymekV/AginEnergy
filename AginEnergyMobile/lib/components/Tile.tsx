import { useMemo } from "react"
import { StyleSheet, View } from "react-native";

export type TileProps = {
    background?: string,
    children?: React.ReactNode,
}

export function Tile({ background, children }: TileProps) {
    const styles = useMemo(() => StyleSheet.create({
        tile: {
            borderRadius: 15,
            backgroundColor: background,
        }
    }), [background]);

    return (
        <View style={styles.tile}>
            {children}
        </View>
    )
}