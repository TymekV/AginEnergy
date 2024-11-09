import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Title } from '@lib/components';
import { useColors } from '@lib/hooks';
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { onboardingPages } from './OnboardingCarousel';
import { SharedValue } from 'react-native-reanimated';
import { Dots } from '../pagination';

export type OnboardingOverlayProps = {
    children?: React.ReactNode,
    next?: () => void,
    progressValue: SharedValue<number>,
    prevPage: number,
}

export function OnboardingOverlay({ children, progressValue, prevPage, next }: OnboardingOverlayProps) {
    const { lightTextColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        image: {
            flex: 1,
            objectFit: 'cover',
            position: 'relative',
        },
        labels: {
            position: 'absolute',
            left: 15,
            right: 15,
            bottom: 15,
            zIndex: 1,
        },
        // labelsContent: {
        //     alignItems: 'center',
        //     gap: 10,
        //     marginBottom: 20,
        // }
    }), []);

    return (
        <>
            <View style={styles.labels}>
                <SafeAreaView>
                    {children}
                    {/* <View style={styles.labelsContent}>
                        <Title order={1} fontFamily='Poppins-SemiBold' color={lightTextColors[0]} textAlign='center'>{title}</Title>
                        <Title order={3} fontFamily='Poppins-Medium' color={lightTextColors[0]} textAlign='center'>{label}</Title>
                    </View> */}
                    <Dots
                        count={onboardingPages.length}
                        progressValue={progressValue}
                        prevPage={prevPage}
                    />
                    <Button onPress={next}>
                        Dalej
                    </Button>
                </SafeAreaView>
            </View>
        </>
    )
}