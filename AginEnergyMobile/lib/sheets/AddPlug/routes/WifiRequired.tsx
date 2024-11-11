import { Button, Loading, SetupPageContent, SheetContainer } from '@lib/components';
import { PinInput } from '@lib/components/PinInput';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconPlug, IconWifi } from '@tabler/icons-react-native';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet';
import { PlugContext } from '..';

export const WifiRequired = ({ router }: RouteScreenProps<'addPlug', 'wifiRequired'>) => {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const checkAPConnection = async () => {
            try {
                const res = await axios.get('http://192.168.4.1/agin-plug-check', { timeout: 3000 });
                return res.data?.isAginPlugDevice === true;
            } catch (error) {
                return false;
            }
        }

        const checkConnection = async () => {
            const connected = await checkAPConnection();
            setConnected(connected);
        }

        const interval = setInterval(checkConnection, 5000);
        checkConnection();

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconWifi}
                title='Połącz się z Wi-Fi'
                description='Aby kontynuować, połącz się z siecią Wi-Fi "AginPlug". Jeśli nie widzisz tej sieci, poczekaj 30 sekund i spróbuj ponownie.'
            >
            </SetupPageContent>
            <SheetBottomActions>
                {!connected && <View style={styles.loading}>
                    <Loading label="Czekanie na połączenie" />
                </View>}
                <Button disabled={!connected} onPress={() => router.navigate('selectWifiNetwork')}>Dalej</Button>
            </SheetBottomActions>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 15,
    }
});