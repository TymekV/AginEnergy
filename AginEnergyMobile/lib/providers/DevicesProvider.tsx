import useApi from "@lib/hooks/useApi";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";


export type DeviceStateType = { label: string; id: string, power: boolean };
export type DevicesStateType = DeviceStateType[]; // Adjust the type of devices as needed
export type DevicesContextType = [DevicesStateType, Dispatch<SetStateAction<DevicesStateType>>];

export const DevicesContext = createContext<DevicesContextType | undefined>(undefined);

export type DevicesProviderProps = {
    children: React.ReactNode;
};

export default function DevicesProvider({ children }: DevicesProviderProps) {
    const [devices, setDevices] = useState<DevicesStateType>([]);

    return (
        <DevicesContext.Provider value={[devices, setDevices]}>
            {children}
        </DevicesContext.Provider>
    );
}
