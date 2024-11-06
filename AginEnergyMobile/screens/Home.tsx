import { useColors } from "@lib/hooks";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    const { backgroundColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            backgroundColor,
            flex: 1,
        }
    }), [backgroundColor]);

    return (
        <View style={styles.container}>

        </View>
    )
}