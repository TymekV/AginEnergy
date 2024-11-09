import { ActivityIndicator, StyleSheet, View } from "react-native"
import Subtitle from "./Subtitle"

export type LoadingProps = {
    label: string,
}

export function Loading({ label }: LoadingProps) {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="small" />
            <Subtitle order={5}>{label}</Subtitle>
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    }
})