import { StyleSheet, Text, View } from "react-native"
import { useColors } from "./hooks";
import { useMemo } from "react";

export default function LegendTag({ color, label }: { color: string, label: string }) {
    const { textColors } = useColors();
    const styles = useMemo(() => StyleSheet.create({
        main: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },
        tag: {
            width: 8,
            height: 8,
            borderRadius: 8,
        },
        label: {
            fontFamily: 'Poppins-Medium',
            fontSize: 13,
            color: textColors[0],
        }
    }), [textColors]);
    return (
        <View style={styles.main}>
            <View style={[styles.tag, { backgroundColor: color }]} />
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}
