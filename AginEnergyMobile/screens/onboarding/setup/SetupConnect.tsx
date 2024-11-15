import { Button, Loading, SetupOption, SetupPage } from '@lib/components';
import { useHubScanner, useServer } from '@lib/hooks';
import { OnboardingParams } from '@lib/navigators';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IconNetwork } from '@tabler/icons-react-native';
import { FlatList, View } from 'react-native';

export function SetupConnect() {
    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    const detectedDevices = useHubScanner();

    const { server, setServer } = useServer();

    return (
        <SetupPage
            icon={IconNetwork}
            title="Połącz się z Agin Hub"
            description="Aby rozpocząć, wybierz Agin Hub z listy poniżej. Sprawdź numer seryjny na obudowie urządzenia i upewnij się, że jest zgodny z numerem na liście. Dzięki temu zapewnimy bezpieczne połączenie i pełną kontrolę nad Twoimi urządzeniami."
        >
            <FlatList
                data={detectedDevices}
                keyExtractor={(item, index) => item.hostname}
                renderItem={({ item, index }) => <SetupOption label={`Agin Hub ${item.serialNumber}`} onPress={() => {
                    setServer(item.hostname.toLowerCase());
                    navigation.navigate('SetupPrice');
                }} />}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                style={{ flex: 1 }}
            />
            <Loading label="Wyszukiwanie urządzeń..." />
            <View style={{ marginBottom: 15, }}></View>
            <Button onPress={() => { navigation.navigate('SetupManually') }} theme='secondary' >Wprowadź IP ręcznie</Button>
        </SetupPage>
    )
}