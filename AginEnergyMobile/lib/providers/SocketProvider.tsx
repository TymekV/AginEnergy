import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


export type SocketProviderProps = {
    children: React.ReactNode;
}
export type TSocketContext = {
    socket: Socket | undefined,
    setSocket: React.Dispatch<React.SetStateAction<Socket | undefined>>,
};

export const SocketContext = createContext<TSocketContext>({
    socket: undefined,
    setSocket: () => { },
});

export type TPlugData = {
    id: string,
    value: number | string
}

export type TPlugDataArray = { id: string, data: TPlugData }[];

export default function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<Socket | undefined>();
    const [data, setData] = useState<TPlugDataArray>();

    useEffect(() => {
        const socket: Socket = io('ws://192.168.10.2:12345');
        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!socket) return;
        async function onState(id: string, data: TPlugData) {
            console.log('id:', id);
        }

        socket?.on('state', onState)
        return (() => {
            socket?.off('state', onState)
        })
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    )
}