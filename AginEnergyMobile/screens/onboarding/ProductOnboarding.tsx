import { OnboardingCarousel } from '@lib/components/onboarding';
import { OnboardingParams } from '@lib/navigators';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function ProductOnboarding() {
    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    return (
        <>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text>NEXT</Text>
            </TouchableOpacity> */}
            <OnboardingCarousel />
        </>
    )
}