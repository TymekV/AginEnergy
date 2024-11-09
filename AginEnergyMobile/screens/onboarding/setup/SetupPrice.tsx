import { Button, Input, SetupPage } from '@lib/components';
import { OnboardingParams } from '@lib/navigators';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IconCurrencyDollar } from '@tabler/icons-react-native';
import { useState } from 'react';

export function SetupPrice() {
    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    const [price, setPrice] = useState<string>('');

    return (
        <SetupPage
            icon={IconCurrencyDollar}
            title="Podaj cenę prądu"
            description="Wprowadź cenę za 1 kWh energii elektrycznej. Informacja ta pozwoli dokładnie obliczać Twoje oszczędności na prądzie."
            actions={<>
                <Button onPress={() => {
                    navigation.navigate('Main');
                    if (price != '') {
                        // TODO: Save price
                    }
                }}>
                    {price == '' ? 'Pomiń' : 'Dalej'}
                </Button>
            </>}
        >
            <Input placeholder='Wprowadź cenę...' value={price} onChangeText={setPrice} keyboardType='numeric' />
        </SetupPage>
    )
}