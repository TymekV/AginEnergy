import axios from "axios";
import { useServer } from "./useServer";
import { useMemo } from "react";
import ipRegex from 'ip-regex';
export default function useApi() {
    const { server } = useServer();

    // console.log({ server });

    const url = `http://${(ipRegex({ exact: true }).test(server) || server == 'localhost') ? server : `${server}.local`}:12345`;
    console.log({ url });


    const api = useMemo(() => server ? axios.create({
        baseURL: url,
    }) : null, [server]);

    return api;
}