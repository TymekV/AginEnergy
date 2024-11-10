import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingParams } from '@lib/navigators';

export type TServerContext = {
    server: string,
    setServer: React.Dispatch<React.SetStateAction<string>>,
}

export const ServerContext = createContext<TServerContext>({
    server: '',
    setServer: () => { },
});

export default function ServerProvider({ children }: { children?: React.ReactNode }) {
    const [server, setServer] = useState('');
    const navigation = useNavigation<NavigationProp<OnboardingParams>>();

    useEffect(() => {
        (async () => {
            const server = await SecureStore.getItemAsync('server');
            if (server == "" || server == null) {
                navigation.navigate('Onboarding');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await SecureStore.setItemAsync('server', server);
        })();
    }, [server]);

    return (
        <ServerContext.Provider value={{ server, setServer }}>
            {children}
        </ServerContext.Provider>
    )
}