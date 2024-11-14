import { Button, Input, SetupPageContent, SheetContainer } from '@lib/components';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconRouter, } from '@tabler/icons-react-native';
import { useCallback, useContext, useState } from 'react';
import { Alert, Keyboard, StyleSheet } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet'
import { PlugContext } from '..';
import useApi from '@lib/hooks/useApi';
import axios from 'axios';

export const SetEmulator = ({ router }: RouteScreenProps<'addPlug', 'wifiPassword'>) => {
    const [plugData, setPlugData] = useContext(PlugContext);
    const [ip, setIp] = useState<string>();
    const api = useApi();


    const checkEmulator = useCallback(async () => {
        const data = await axios.get(`http://${ip}`, { timeout: 10000 });
        if (data?.data?.emulator) {
            Alert.alert('emulator connect');
        } else {
            Alert.alert('Błąd połączenia', 'Sprawdź połączenie, poprawność adresu ip i działanie emulatora');
        }
    }, [ip])

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconRouter}
                title='Podaj ip i port emulatora'
                description={`Podaj ip komputera na którym chodzi emulator oraz port, który wyświetla się w aplikacje emulatora (np. \"192.168.1.10:54321\")`}
            >
                <Input placeholder="Wprowadź ip i port..." value={ip} onChangeText={setIp} autoFocus />
            </SetupPageContent>
            <SheetBottomActions>
                <Button disabled={!ip || ip.length < 1} onPress={() => {
                    Keyboard.dismiss();
                    checkEmulator();
                    // router.navigate('wifiConnecting');
                }}>Dalej</Button>
            </SheetBottomActions>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 15,
    }
});