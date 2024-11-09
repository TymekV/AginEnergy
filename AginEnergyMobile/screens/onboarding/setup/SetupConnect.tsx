import { Loading, SetupOption, SetupPage } from '@lib/components';
import { OnboardingParams } from '@lib/navigators';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IconNetwork } from '@tabler/icons-react-native';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import dgram from 'react-native-udp';

export type Device = {
    serialNumber: number,
    hostname: string,
}

export function SetupConnect() {
    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    const [detectedDevices, setDetectedDevices] = useState<Device[]>([
        {
            serialNumber: 2137,
            hostname: 'aginhub-2137.local',
        },
        {
            serialNumber: 6969,
            hostname: 'aginhub-6969.local',
        },
    ]);

    return (
        <SetupPage
            icon={IconNetwork}
            title="Połącz się z Agin Hub"
            description="Aby rozpocząć, wybierz Agin Hub z listy poniżej. Sprawdź numer seryjny na obudowie urządzenia i upewnij się, że jest zgodny z numerem na liście. Dzięki temu zapewnimy bezpieczne połączenie i pełną kontrolę nad Twoimi urządzeniami."
        >
            <FlatList
                data={detectedDevices}
                keyExtractor={(item, index) => item.hostname}
                renderItem={({ item, index }) => <SetupOption label={`Agin Hub ${item.serialNumber}`} />}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                style={{ flex: 1 }}
            />
            <Loading label="Wyszukiwanie urządzeń..." />
        </SetupPage>
    )
}