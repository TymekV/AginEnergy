import { useColors } from "@lib/hooks";
import { useMemo } from "react";
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, View } from "react-native";
import { Title } from "./Title";

export interface SetupOptionProps extends TouchableHighlightProps {
    label: string,
}

export function SetupOption({ label, ...props }: SetupOptionProps) {
    const { setupOptionColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        option: {
            borderRadius: 10,
            backgroundColor: setupOptionColor,
            padding: 20,
        },
        touchable: {
            borderRadius: 10,
        }
    }), [setupOptionColor]);

    return (
        <TouchableHighlight style={styles.touchable} {...props}>
            <View style={styles.option}>
                <Title order={2}>{label}</Title>
            </View>
        </TouchableHighlight>
    )
}