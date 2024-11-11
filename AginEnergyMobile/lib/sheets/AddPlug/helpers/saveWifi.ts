import axios from "axios";

export async function saveWifi(ssid: string, password?: string) {
    const res = await axios.get('http://192.168.4.1/wifisave', {
        params: {
            ssid,
            psk: password,
        }
    });
}