import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { OnboardingPage } from './OnboardingPage';
import { OnboardingOverlay } from './OnboardingOverlay';
import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingParams } from '@lib/navigators';

export type TOnboardingPage = {
    title: string,
    label: string,
    image: any,
}

export const onboardingPages: TOnboardingPage[] = [
    {
        title: 'Oszczędzaj energię',
        label: 'Witaj w Agin Energy! Twoim asystencie w oszczędzaniu energii i dbaniu o środowisko. Razem zmniejszamy zużycie energii i dbamy o planetę!',
        image: require('@assets/onboarding/save-energy.jpg'),
    },
    {
        title: 'Agin Hub',
        label: 'Połącz się z Agin Hub, aby zarządzać wszystkimi urządzeniami w jednym miejscu. Odkryj nowe sposoby na efektywne wykorzystanie energii.',
        image: require('@assets/onboarding/agin-hub.jpg'),
    },
    {
        title: 'Agin Plug',
        label: 'Korzystaj z gniazdek Agin Plug, które umożliwiają zdalne sterowanie urządzeniami oraz pomiar zużycia prądu. Bądź zawsze na bieżąco z zużyciem energii w domu.',
        image: require('@assets/onboarding/agin-plug.jpg'),
    },
    {
        title: 'Zarządzaj Energią w Aplikacji',
        label: 'Monitoruj, analizuj i optymalizuj swoje zużycie energii z poziomu aplikacji Agin Energy. Zmieniaj ustawienia, oszczędzaj czas i pieniądze.',
        image: require('@assets/onboarding/app.png'),
    },
]

export function OnboardingCarousel() {
    const { width, height } = Dimensions.get('window');

    const carouselRef = useRef<any>(null);

    const [index, setIndex] = useState(0);

    const progressValue = useSharedValue<number>(0);

    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <Carousel
                ref={carouselRef}
                width={width}
                height={height}
                data={onboardingPages}
                loop={false}
                scrollAnimationDuration={1000}
                onProgressChange={(_, absoluteProgress) => {
                    progressValue.value = absoluteProgress
                }}
                onSnapToItem={(index) => setIndex(index)}
                renderItem={({ index }) => (
                    <OnboardingPage {...onboardingPages[index]} />
                )}
            />
            <OnboardingOverlay
                next={() => index == (onboardingPages.length - 1) ? navigation.navigate('SetupConnect') : carouselRef?.current?.next()}
                progressValue={progressValue}
                prevPage={index}
            />
        </View>
    );
}