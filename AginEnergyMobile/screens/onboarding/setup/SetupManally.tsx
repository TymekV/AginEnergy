import { Button, Input, SetupPage } from '@lib/components';
import { useServer } from '@lib/hooks';
import { OnboardingParams } from '@lib/navigators';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IconCurrencyDollar, IconHomeEco } from '@tabler/icons-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export function SetupManually() {
    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    const [ip, setIp] = useState<string>('');
    const { server, setServer } = useServer();

    return (
        <SetupPage
            icon={IconHomeEco}
            title="Podaj adres huba"
            description="Podaj adress IP jaki nosi hub."
            actions={<>
                <Button onPress={() => { setServer(ip.toLowerCase()); navigation.navigate('SetupPrice') }}>Dalej</Button>
                <View style={{ marginBottom: 15, }}></View>
                <Button theme='secondary' onPress={() => navigation.navigate('SetupConnect')}>Powrót</Button>

            </>}
        >
            <Input placeholder='Wprowadź IP...' value={ip} onChangeText={setIp} />

        </SetupPage>
    )
}