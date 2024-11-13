import axios from "axios";
import { useMemo } from "react";

export default function useApi() {
    const server = process.env.API_URL

    // console.log({ server });


    const api = useMemo(() => server ? axios.create({
        baseURL: `http://${server}:12345`,
    }) : null, [server]);

    return api;
}