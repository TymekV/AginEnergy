import { StyledActionSheet } from '@lib/components';
import { Route } from 'react-native-actions-sheet';
import { ConnectIntroduction, SelectWifiNetwork, WifiRequired } from './routes';
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
];

export type TPlugData = {
    connectedToWifi: boolean,
    serialNumber: string,
}

export type TPlugDataContext = [
    TPlugData,
    React.Dispatch<React.SetStateAction<TPlugData>>,
];

const initialPlug = {
    connectedToWifi: false,
    serialNumber: '',
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
