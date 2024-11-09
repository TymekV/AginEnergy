import { useMemo } from "react";
import { StyleSheet } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"

export type DotProps = {
    progressValue: SharedValue<number>,
    index: number,
    prevPage: number,
}

export function Dot({ progressValue, index, prevPage }: DotProps) {
    const styles = useMemo(() => StyleSheet.create({
        dot: {
            height: 6,
            borderRadius: 6,
            backgroundColor: '#fff',
        }
    }), []);

    const dotStyles = useAnimatedStyle(() => {
        'worklet';

        const page = Math.floor(progressValue.value);

        const isLeft = progressValue.value < prevPage;
        // console.log({ isLeft });


        let interpolationOutput;

        if (isLeft) {
            interpolationOutput = index == prevPage ? [6, 12] : index == (prevPage - 1) ? [12, 6] : [6, 6];
        } else {
            interpolationOutput = index == prevPage ? [12, 6] : index == (prevPage + 1) ? [6, 12] : [6, 6];
        }
        console.log({ cock: progressValue.value % 1, prevPage, index, interpolationOutput, value: progressValue.value % 1 });

        return {
            width: interpolate(progressValue.value % 1, [0, 1], interpolationOutput, Extrapolation.CLAMP),
        };
    }, [prevPage, index]);

    return (
        <Animated.View style={[styles.dot, dotStyles]}>

        </Animated.View>
    )
}