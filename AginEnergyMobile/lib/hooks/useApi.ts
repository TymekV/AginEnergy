import axios from "axios";
import { useServer } from "./useServer";
import { useMemo } from "react";

function validateIPaddress(ipaddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/.test(ipaddress)) {
        return true;
    }
    return false;
}

export default function useApi() {
    const { server } = useServer();

    console.log({ server });

    const url = `http://${server}:12345`;
    console.log({ url });


    const api = useMemo(() => server ? axios.create({
        baseURL: url,
    }) : null, [server]);

    return api;
}