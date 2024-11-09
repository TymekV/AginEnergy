import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from '@lib/components';

export type OnboardingOverlayProps = {
    children?: React.ReactNode,
    next?: () => void,
}

export function OnboardingOverlay({ children, next }: OnboardingOverlayProps) {
    const styles = useMemo(() => StyleSheet.create({
        image: {
            flex: 1,
            objectFit: 'cover',
            position: 'relative',
        },
        gradient: {
            ...StyleSheet.absoluteFillObject,
        },
        labels: {
            position: 'absolute',
            left: 15,
            right: 15,
            bottom: 15,
            zIndex: 1,
        }
    }), []);

    return (
        <>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
                style={styles.gradient}
                pointerEvents='none'
            />
            <View style={styles.labels}>
                <SafeAreaView>
                    {children}
                    <Button onPress={next}>
                        Dalej
                    </Button>
                </SafeAreaView>
            </View>
        </>
    )
}