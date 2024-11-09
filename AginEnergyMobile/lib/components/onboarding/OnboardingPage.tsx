import { Button } from '@lib/components';
import { useMemo } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type OnboardingPageProps = {
    title: string,
    label: string,
    image: any,
}

export function OnboardingPage({ title, label, image }: OnboardingPageProps) {
    const styles = useMemo(() => StyleSheet.create({
        image: {
            flex: 1,
            objectFit: 'cover',
            position: 'relative',
        },
    }), []);

    return (
        <ImageBackground source={image} style={styles.image}>

        </ImageBackground>
    )
}
