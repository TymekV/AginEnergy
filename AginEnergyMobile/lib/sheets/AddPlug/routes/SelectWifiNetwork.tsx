import { Button, Loading, SetupOption, SetupPageContent, SheetContainer } from '@lib/components';
import { PinInput } from '@lib/components/PinInput';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { useColors } from '@lib/hooks';
import { IconLock, IconPlug, IconWifi, IconWifi0, IconWifi1, IconWifi2 } from '@tabler/icons-react-native';
import axios from 'axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FlatList, RouteScreenProps, } from 'react-native-actions-sheet'
import { PlugContext } from '..';

// {
//     "mac": "48:55:19:00:E2:BC",
//     "name": "aginplug_123456",
//     "aps": [
//         {},
//         {
//             "ssid": "SPACE",
//             "rssi": -58,
//             "lock": 1
//         },
//         {
//             "ssid": "MF971R_2939C5",
//             "rssi": -91,
//             "lock": 1
//         },
//         {
//             "ssid": "NETIASPOT-2,4GHz-696B80",
//             "rssi": -93,
//             "lock": 1
//         }
//     ]
// }

export type Network = {
    ssid: string,
    rssi: number,
    lock: 0 | 1,
}

export type NetworksConfig = {
    mac: string,
    name: string,
    aps: Network[],
}

const initialConfig: NetworksConfig = {
    mac: '',
    name: '',
    aps: [],
}

export const WifiIcon = ({ strength }: { strength: number }) => {
    const signalPercentage = Math.max(Math.min(2 * (strength + 100), 100), 0);

    if (signalPercentage < 20) {
        return IconWifi0;
    } else if (signalPercentage < 40) {
        return IconWifi1;
    } else if (signalPercentage < 60) {
        return IconWifi2;
    } else {
        return IconWifi;
    }
}

export const SelectWifiNetwork = ({ router }: RouteScreenProps<'addPlug', 'selectWifiNetwork'>) => {
    const { textColors } = useColors();

    const [plugData, setPlugData] = useContext(PlugContext);
    const [networksConfig, setNetworksConfig] = useState<NetworksConfig>(initialConfig);

    const errorShown = useRef<boolean>(false);

    const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const scanNetworks = async () => {
            console.log('scanning networks');

            try {
                const res = await axios.get(`http://192.168.4.1/config.json`, { timeout: 14000 });
                setNetworksConfig({ ...res.data, aps: res.data.aps.filter((x: Network) => !!x.ssid) });
            } catch (error) {
                console.log(error);
                setNetworksConfig(initialConfig);

                if (errorShown.current) return;

                errorShown.current = true;
                Alert.alert('Wyszukiwanie sieci Wi-Fi nie powiodło się', 'Upewnij się, że urządzenie jest połączone z siecią Wi-Fi "AginPlug".', [
                    {
                        text: 'OK',
                        onPress: () => errorShown.current = false,
                        style: 'default',
                    },
                ], {
                    onDismiss: () => errorShown.current = false,
                });
            }
        }

        const interval = setInterval(scanNetworks, 15_000);
        scanNetworks();
        intervalRef.current = interval;

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconWifi}
                title='Wybierz sieć Wi-Fi'
                description='Wybierz sieć Wi-Fi dla Agin Plug. Prosimy o wybranie swojej sieci domowej — tej samej, do której jest podłączony Agin Hub.'
            >
                <FlatList
                    data={networksConfig.aps}
                    keyExtractor={(item, index) => item.ssid}
                    renderItem={({ item, index }) => <SetupOption
                        label={item.ssid}
                        key={item.ssid}
                        icon={WifiIcon({ strength: item.rssi })}
                        rightSection={item.lock == 1 ? <IconLock color={textColors[0]} size={16} /> : <></>}
                        onPress={() => {
                            setPlugData(d => ({ ...d, ssid: item.ssid }));
                            if (intervalRef.current) clearInterval(intervalRef.current);
                            if (item.lock == 1) {
                                router.navigate('wifiPassword');
                            } else {
                                router.navigate('wifiConnecting');
                            }
                        }}
                    />}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    style={{ flex: 1 }}
                />
                <SheetBottomActions>
                    <Loading label="Wyszukiwanie sieci Wi-Fi..." />
                </SheetBottomActions>
            </SetupPageContent>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 15,
    }
});