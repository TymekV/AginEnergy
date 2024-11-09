import React, { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

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

    useEffect(() => {
        (async () => {
            const server = await SecureStore.getItemAsync('server');
            setServer(server ?? '');
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