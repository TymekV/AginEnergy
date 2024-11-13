import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DevicesContext, DevicesStateType, DeviceStateType } from "./DevicesProvider";
import { useServer } from "@lib/hooks";
import ipRegex from "ip-regex";


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

    const { server } = useServer();

    useEffect(() => {
        if (!server) return;

        const url = `ws://${(ipRegex({ exact: true }).test(server) || server == 'localhost') ? server : `${server}.local`}:12345`;
        console.log('sokcet url', url);

        const socket: Socket = io(url);
        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, [server]);

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
            // console.log('id:', id);
            const index = devices.findIndex((f) => f?.id == id)
            setDevices((d: DevicesStateType) => { const newArr = [...d]; newArr[index].on = true; return newArr; })

        }
        function onOff(id: string) {
            // console.log(devices);
            const index = devices.findIndex((f) => f?.id == id)
            setDevices((d: DevicesStateType) => { const newArr = [...d]; newArr[index].on = false; return newArr; })

        }
        function onUpdate(data: DeviceStateType[]) {
            setDevices(data);
        }

        socket?.on('on', onOn);
        socket?.on('off', onOff);
        socket?.on('update', onUpdate);
        socket?.on('state', onState);
        return (() => {
            socket?.off('state', onState);
            socket?.off('update', onUpdate);
            socket?.off('on', onOn);
            socket?.off('off', onOff);
        })
    }, [socket, devices]);

    return (
        <SocketContext.Provider value={data}>
            {children}
        </SocketContext.Provider>
    )
}