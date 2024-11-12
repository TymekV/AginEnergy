import { relayUrl } from '@lib/config';
import { usePush } from '@lib/hooks';
import useApi from '@lib/hooks/useApi';
import axios from 'axios';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function PushProvider({ children }: { children: React.ReactNode }) {
    const { token } = usePush();

    const api = useApi();

    useEffect(() => {
        (async () => {
            if (!token || !api) return;

            try {
                // const aginTokenRes = await axios.post(`${relayUrl}/notifications/tokens`, {
                //     platform: Platform.OS,
                //     nativeToken: token,
                // });

                // const aginToken = aginTokenRes.data.token;

                // await api.put('/push/tokens', { aginToken });
            } catch (error) {
                console.log(error);
            }

        })();
    }, [token, api]);

    return (
        <>
            {children}
        </>
    )
}