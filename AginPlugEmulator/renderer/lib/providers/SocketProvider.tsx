import { createContext, useCallback } from "react";
import useApi from "../hooks/useApi";


export default function SocketProvider() {
    const api = useApi();

    const setPower = useCallback(async (value: boolean) => {
        // console.log('refreshing devices');
        // console.log({ api });
        if (!api) return;


        console.log(api.getUri());


        const devices = await api.get('/plugs').catch((e) => console.log(e));
        // console.log(devices?.data[0]);


    }, [api]);

}