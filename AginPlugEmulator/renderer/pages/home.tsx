import React, { useState } from 'react';
import Head from 'next/head';
import { Plug, PlugView } from '../lib/components';
import classes from './Home.module.css';
import { ActionIcon } from '../lib/components/ActionIcon';
import { IconPower } from '@tabler/icons-react';

export default function HomePage() {
    // React.useEffect(() => {
    //     window.ipc.on('message', (message: string) => {
    //         setMessage(message)
    //     })
    // }, [])

    const [on, setOn] = useState(false);

    return (
        <>
            <Head>
                <title>Agin Plug Emulator</title>
            </Head>
            <div className={classes.home}>
                <PlugView>
                    <Plug on={on} />
                    <ActionIcon icon={IconPower} onClick={() => setOn(x => !x)} />
                </PlugView>
            </div>
        </>
    )
}
