import { StyledActionSheet } from '@lib/components';
import { Route } from 'react-native-actions-sheet';
import { ConnectIntroduction, SelectWifiNetwork, SetName, WifiConnecting, WifiPassword, WifiRequired } from './routes';
import { createContext, useState } from 'react';

const routes: Route[] = [
    {
        name: 'connectIntroduction',
        component: ConnectIntroduction,
    },
    {
        name: 'wifiRequired',
        component: WifiRequired,
    },
    {
        name: 'selectWifiNetwork',
        component: SelectWifiNetwork,
    },
    {
        name: 'wifiPassword',
        component: WifiPassword,
    },
    {
        name: 'wifiConnecting',
        component: WifiConnecting,
    },
    {
        name: 'setName',
        component: SetName,
    },
];

export type TPlugData = {
    connectedToWifi: boolean,
    serialNumber: string,
    ssid: string,
    password: string,
    name: string,
}

export type TPlugDataContext = [
    TPlugData,
    React.Dispatch<React.SetStateAction<TPlugData>>,
];

const initialPlug = {
    connectedToWifi: false,
    serialNumber: '',
    ssid: '',
    password: '',
    name: '',
}

export const PlugContext = createContext<TPlugDataContext>([
    initialPlug,
    () => { }
]);

export default function AddPlug() {
    const [plugData, setPlugData] = useState<TPlugData>(initialPlug);

    return (
        <PlugContext.Provider value={[plugData, setPlugData]}>
            <StyledActionSheet
                fullHeight
                drawUnderStatusBar={true}
                gestureEnabled={true}
                enableRouterBackNavigation={true}
                routes={routes}
                initialRoute="connectIntroduction"
            />
        </PlugContext.Provider>
    )
}
