import { useServer } from "@lib/hooks";
import useApi from "@lib/hooks/useApi";
import React, { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";


export type DeviceStateType = { label: string; id: string, power: boolean, on?: boolean };
export type DevicesStateType = DeviceStateType[]; // Adjust the type of devices as needed
export type DevicesContextType = {
    devices: DevicesStateType,
    setDevices: Dispatch<SetStateAction<DevicesStateType>>,
    refreshDevices: (onEnd?: () => void) => Promise<void>,
};

const initialValue: DevicesContextType = {
    devices: [],
    setDevices: () => { },
    refreshDevices: async (onEnd?: () => void) => { }
};

export const DevicesContext = createContext<DevicesContextType>(initialValue);

export type DevicesProviderProps = {
    children: React.ReactNode;
};

export default function DevicesProvider({ children }: DevicesProviderProps) {
    const [devices, setDevices] = useState<DevicesStateType>([]);

    const api = useApi();

    const { server } = useServer();

    const refreshDevices = useCallback(async (onEnd?: () => void) => {
        // console.log('refreshing devices');
        // console.log({ api });

        if (!api) return;

        console.log(api.getUri());


        const devices = await api.get('/plugs').catch((e) => onEnd?.());
        // console.log(devices?.data[0]);

        setDevices(devices?.data);
        onEnd?.();
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
