import { Button, SetupPageContent, SheetContainer } from '@lib/components';
import { PinInput } from '@lib/components/PinInput';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconPlug } from '@tabler/icons-react-native';
import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet';
import { PlugContext } from '..';

export const ConnectIntroduction = ({ router }: RouteScreenProps<'addPlug', 'connectIntroduction'>) => {
    const [code, setCode] = useState<string[]>(new Array(6).fill(''));

    const [loading, setLoading] = useState(false);

    const [plugData, setPlugData] = useContext(PlugContext);

    const checkCode = useCallback(async (plugCode: string): Promise<'not-found' | 'on-network' | 'already-connected-to-ap'> => {
        try {
            console.log('trying', `http://aginplug_${plugCode}.local`);
            await axios.get(`http://aginplug_${plugCode}.local`, { timeout: 3000 });

            console.log('Success, checking for access point');

            try {
                // If the plug is detected we need to check if it is connected to the actual network or the client is connected to the access point
                const captiveCheck = await axios.get('http://192.168.4.1/agin-plug-check', { timeout: 3000 });
                if (captiveCheck.data?.isAginPlugDevice === true) {
                    console.log('AP detected');
                    return 'already-connected-to-ap';
                }
            } catch (error) {

            }

            console.log('No access point detected, plug is connected to the actual network');
            return 'on-network';
        } catch (error) {
            console.log('not found, error:', error);

            return 'not-found';
        }
    }, []);

    const findPlug = useCallback(async () => {
        setLoading(true);
        const plugCode = code.join('');

        setPlugData(d => ({ ...d, serialNumber: plugCode }));

        const type = await checkCode(plugCode);

        Keyboard.dismiss();
        if (type == 'not-found') {
            router.navigate('wifiRequired');
        } else if (type == 'on-network') {
            router.navigate('setName');
        } else if (type == 'already-connected-to-ap') {
            router.navigate('selectWifiNetwork');
        }
    }, [code, setPlugData, checkCode]);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconPlug}
                title='Skonfiguruj Agin Plug'
                description='Aby kontynuować konfigurację, wprowadź 6-cyfrowy kod parowania znajdujący się na naklejce na obudowie Agin Plug.'
            >
                <View style={styles.pairCode}>
                    <PinInput
                        cellCount={6}
                        value={code}
                        onChange={setCode}
                    />
                </View>
            </SetupPageContent>
            <SheetBottomActions>
                <Button disabled={code.some(x => x == '') || loading} onPress={findPlug}>Dalej</Button>
            </SheetBottomActions>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    pairCode: {
        alignItems: 'center',
        marginBottom: 20,
    }
});