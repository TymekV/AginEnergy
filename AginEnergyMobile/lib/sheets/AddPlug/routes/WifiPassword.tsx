import { Button, Input, SetupPageContent, SheetContainer } from '@lib/components';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconKey } from '@tabler/icons-react-native';
import { useContext } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet'
import { PlugContext } from '..';

export const WifiPassword = ({ router }: RouteScreenProps<'addPlug', 'wifiPassword'>) => {
    const [plugData, setPlugData] = useContext(PlugContext);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconKey}
                title='Podaj hasło Wi-Fi'
                description={`Hasło jest potrzebne, aby Agin Plug mógł połączyć się z Twoją domową siecią Wi-Fi. Łączysz się z siecią Wi-Fi ${plugData.ssid}`}
            >
                <Input placeholder="Wproawdź hasło..." value={plugData.password} onChangeText={(p) => setPlugData(d => ({ ...d, password: p }))} secureTextEntry autoFocus />
            </SetupPageContent>
            <SheetBottomActions>
                <Button disabled={plugData.password.length < 8} onPress={() => {
                    Keyboard.dismiss();
                    router.navigate('wifiConnecting');
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