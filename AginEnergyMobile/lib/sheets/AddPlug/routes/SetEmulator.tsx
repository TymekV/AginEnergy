import { Button, Input, Loading, SetupPageContent, SheetContainer } from '@lib/components';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconRouter, } from '@tabler/icons-react-native';
import { useCallback, useContext, useState } from 'react';
import { Alert, Keyboard, StyleSheet, View } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet'
import { PlugContext } from '..';
import useApi from '@lib/hooks/useApi';
import axios from 'axios';

export const SetEmulator = ({ router }: RouteScreenProps<'addPlug', 'wifiPassword'>) => {
    const [plugData, setPlugData] = useContext(PlugContext);
    const [ip, setIp] = useState<string>();
    const [loading, setLoading] = useState(false);
    const api = useApi();


    const checkEmulator = useCallback(async () => {
        if (ip == undefined)
            return;

        setLoading(true);

        const isPlug = await api?.get(`/plugs/${ip}`).then(() => {
            Alert.alert('Ta wtyczka jest już dodana');
            setLoading(false);
            router.close();
            return;
        }, () => { });
        const data = await axios.get(`http://${ip}`, { timeout: 10000 }).catch((e) => Alert.alert('Błąd połączenia', 'Sprawdź połączenie, poprawność adresu ip i działanie emulatora'));
        if (data?.data?.emulator) {
            // Alert.alert('emulator connect');
            setPlugData(d => ({ ...d, serialNumber: ip, emulator: true }));
            router.navigate('setName');
        }
        setLoading(false);
    }, [ip, setPlugData, api]);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconRouter}
                title='Podaj IP i port emulatora'
                description={`Podaj IP komputera na którym chodzi emulator oraz port, który wyświetla się w aplikacje emulatora (np. \"192.168.1.10:54321\")`}
            >
                <Input placeholder="Wprowadź IP i port..." value={ip} onChangeText={setIp} autoFocus />
            </SetupPageContent>
            <SheetBottomActions>
                {loading && <View style={styles.loading}>
                    <Loading label="Łączenie" />
                </View>}
                <Button disabled={!ip || ip.length < 1 || loading} onPress={async () => {
                    Keyboard.dismiss();
                    await checkEmulator();
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