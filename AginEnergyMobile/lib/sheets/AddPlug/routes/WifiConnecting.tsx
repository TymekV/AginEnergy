import { Button, Loading, SetupPageContent, SheetContainer } from '@lib/components';
import { PinInput } from '@lib/components/PinInput';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconPlug, IconWifi } from '@tabler/icons-react-native';
import axios from 'axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet';
import { PlugContext } from '..';
import { saveWifi } from '../helpers';

export const WifiConnecting = ({ router }: RouteScreenProps<'addPlug', 'wifiConnecting'>) => {
    const [plugData, setPlugData] = useContext(PlugContext);
    // const [connected, setConnected] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const checkWifiConnection = async () => {
            console.log('Checking wifi');

            let firstCheck = false;
            try {
                // TODO: Checking
                const res = await axios.get('http://192.168.4.1/agin-plug-check', { timeout: 3000 });
                firstCheck = res.data?.isAginPlugDevice !== true;
            } catch (error) {
                console.log('captive check ->', error);
                firstCheck = true;
            }
            console.log('captive check', firstCheck);

            let secondCheck;
            try {
                // TODO: Checking
                console.log(`http://aginplug_${plugData.serialNumber}.local`);

                const res = await axios.get(`http://aginplug_${plugData.serialNumber}.local`, { timeout: 5000 });
                secondCheck = true;
            } catch (error) {
                console.log('webserver check ->', error);
                secondCheck = false;
            }
            console.log('webserver check', secondCheck);

            const passed = firstCheck && secondCheck;
            console.log({ passed });

            if (passed) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                router.navigate('setName');
            }
        }

        saveWifi(plugData.ssid, plugData.password);

        const interval = setInterval(checkWifiConnection, 10000);
        checkWifiConnection();
        intervalRef.current = interval;

        return () => {
            clearInterval(interval);
        }
    }, [plugData.ssid, plugData.password, plugData.serialNumber]);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconWifi}
                title='Łączenie z Wi-Fi'
                description={`Agin Plug łączy się z siecią Wi-Fi ${plugData.ssid}. Jeśli proces trwa dłużej niż 30 sekund, naciśnij przycisk "Zmień sieć Wi-Fi" i upewnij się, że wpisano poprawne hasło.`}
            >
            </SetupPageContent>
            <SheetBottomActions>
                <View style={styles.loading}>
                    <Loading label="Łączenie" />
                </View>
                <Button onPress={() => {
                    setPlugData(d => ({ ...d, ssid: '', password: '' }));
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    router.goBack('selectWifiNetwork');
                }} theme='secondary'>Zmień sieć Wi-Fi</Button>
            </SheetBottomActions>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 15,
    }
});