import { useServer } from "@lib/hooks";
import useApi from "@lib/hooks/useApi";
import React, { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";


export type DeviceStateType = { label: string; id: string, power: boolean };
export type DevicesStateType = DeviceStateType[]; // Adjust the type of devices as needed
export type DevicesContextType = {
    devices: DevicesStateType,
    setDevices: Dispatch<SetStateAction<DevicesStateType>>,
    refreshDevices: () => Promise<void>,
};

const initialValue: DevicesContextType = {
    devices: [],
    setDevices: () => { },
    refreshDevices: async () => { }
};

export const DevicesContext = createContext<DevicesContextType>(initialValue);

export type DevicesProviderProps = {
    children: React.ReactNode;
};

export default function DevicesProvider({ children }: DevicesProviderProps) {
    const [devices, setDevices] = useState<DevicesStateType>([]);

    const api = useApi();

    const { server } = useServer();

    const refreshDevices = useCallback(async () => {
        console.log('refreshing devices');
        console.log({ api });

        if (!api) return;

        const devices = await api.get('/plugs');
        setDevices(devices?.data);
    }, [api, server]);

    useEffect(() => {
        (async () => {
            await refreshDevices();
        })();
    }, [refreshDevices]);

    return (
        <DevicesContext.Provider value={{ devices, setDevices, refreshDevices }}>
            {children}
        </DevicesContext.Provider>
    );
}
