import { ThemeIcon, Title } from "@lib/components";
import { useColors } from "@lib/hooks";
import { IconBolt } from "@tabler/icons-react-native";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import React from "react";

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
            <ThemeIcon icon={IconBolt} />
            <Title color={0}>Title</Title>
        </View>
    )
}