import axios from "axios";
import { useServer } from "./useServer";
import { useMemo } from "react";

export default function useApi() {
    const { server } = useServer();

    console.log({ server });


    const api = useMemo(() => {
        console.log('creating instance', `http://${server}:12345`)
        return axios.create({
            baseURL: `http://${server}:12345`,
        });
    }, [server]);

    return api;
}