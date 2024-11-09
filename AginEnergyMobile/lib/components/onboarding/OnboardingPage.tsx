import { Button, Title } from '@lib/components';
import { useMemo } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors } from '@lib/hooks';

export type OnboardingPageProps = {
    title: string,
    label: string,
    image: any,
}

export function OnboardingPage({ title, label, image }: OnboardingPageProps) {
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
            zIndex: 2,
        },
        labelsContent: {
            alignItems: 'center',
            gap: 10,
            marginBottom: 70,
        },
        gradient: {
            ...StyleSheet.absoluteFillObject,
            zIndex: 0,
        },
    }), []);

    return (
        <ImageBackground source={image} style={styles.image}>
            <LinearGradient
                colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}
                style={styles.gradient}
            // pointerEvents='none'
            />
            <View style={styles.labels}>
                <SafeAreaView>
                    <View style={styles.labelsContent}>
                        <Title order={1} fontFamily='Poppins-SemiBold' color={lightTextColors[0]} textAlign='center'>{title}</Title>
                        <Title order={3} fontFamily='Poppins-Medium' color={lightTextColors[0]} textAlign='center'>{label}</Title>
                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
    )
}
