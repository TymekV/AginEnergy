import { StyleSheet, View } from "react-native"
import { SharedValue } from "react-native-reanimated"
import { Dot } from "./Dot";

export type DotsProps = {
    count: number,
    progressValue: SharedValue<number>,
    prevPage: number,
}

export function Dots({ count, progressValue, prevPage }: DotsProps) {
    return (
        <View style={styles.container}>
            {new Array(count).fill(0).map((d, i) => <Dot index={i} progressValue={progressValue} prevPage={prevPage} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 5,
    }
});