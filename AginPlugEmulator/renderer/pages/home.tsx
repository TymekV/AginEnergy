import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Plug, PlugView } from '../lib/components';
import classes from './Home.module.css';
import { ActionIcon } from '../lib/components/ActionIcon';
import { IconPower } from '@tabler/icons-react';
import useApi from '../lib/hooks/useApi';
import ControlPanel from '../lib/components/controlPanel';

export default function HomePage() {
    const [on, setOn] = useState(false);
    const api = useApi();
    const [colors, setColors] = useState<{ red?: number, green?: number, blue?: number, }>({ red: 0, green: 151, blue: 60 });

    useEffect(() => {
        window.ipc.on('update', (message: boolean) => {
            console.log(message);
        });
        window.ipc.on('remotePower', (value: boolean) => {
            setOn(x => value);
        })
        window.ipc.on('colorChange', (value: { red?: number, green?: number, blue?: number, }) => {
            setColors(x => value);
        })

    }, [])


    useEffect(() => {
        window.ipc.send('power', on);
    }, []);

    async function onPower(value: boolean) {
        setOn(x => value);
        window.ipc.send('power', value);
    }

    return (
        <>
            <Head>
                <title>Agin Plug Emulator</title>
            </Head>
            <div className={classes.home}>
                <PlugView>
                    <Plug glow={colors} on={on} />
                    <ActionIcon icon={IconPower} onClick={() => { onPower(!on) }} />
                </PlugView>
                <ControlPanel />
            </div>
        </>
    )
}
