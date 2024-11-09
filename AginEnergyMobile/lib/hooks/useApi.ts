import axios from "axios";
import { useServer } from "./useServer";
import { useMemo } from "react";

export default function useApi() {
    const { server } = useServer();

    console.log({ server });


    const api = useMemo(() => server ? axios.create({
        baseURL: `http://${server}`,
    }) : null, [server]);

    return api;
}