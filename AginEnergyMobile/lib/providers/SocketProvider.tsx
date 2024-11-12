import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DevicesContext, DevicesStateType, DeviceStateType } from "./DevicesProvider";


export type SocketProviderProps = {
    children: React.ReactNode;
}
export type TSocketContext = {
    data: TPlugData,
    setData: React.Dispatch<React.SetStateAction<TPlugData>>,
};

export const SocketContext = createContext<TPlugDataArray[]>([]);

export type TPlugData = {
    id?: string,
    'voltage'?: number,
    'current'?: number,
    'power'?: number,
    'temperature'?: number,
}

export type TPlugDataArray = TPlugData[];

export default function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<Socket | undefined>();
    const [data, setData]: any = useState<TPlugDataArray[]>([]);
    const { devices, setDevices, refreshDevices } = useContext(DevicesContext);

    useEffect(() => {
        const socket: Socket = io('ws://192.168.10.2:12345');
        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!socket) return;
        function onState(data: TPlugData) {
            setData((d: TPlugDataArray[]) => {
                const newArr = [...d];
                if (newArr.length - 1 < 0) {
                    newArr.push([]);
                    return newArr;
                }
                const index = newArr[newArr.length - 1]?.findIndex((f) => f.id == data.id);
                if (index == -1) {
                    newArr[newArr.length - 1].push(data);
                } else {
                    newArr.push([data]);
                }

                if (newArr.length > 15) {
                    newArr.shift();
                }

                // console.log(newArr[newArr.length - 1]);
                return newArr
            });
        }

        function onOn(id: string) {
            console.log(id);

        }

        socket?.on('on', onOn)
        socket?.on('state', onState)
        return (() => {
            socket?.off('state', onState)
            socket?.off('on', onOn)
        })
    }, [socket]);

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    )
}