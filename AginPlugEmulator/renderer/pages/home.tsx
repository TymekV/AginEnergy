import React from 'react';
import Head from 'next/head';
import { PlugView } from '../lib/components';
import classes from './Home.module.css';

export default function HomePage() {
    const [message, setMessage] = React.useState('No message found')

    React.useEffect(() => {
        window.ipc.on('message', (message: string) => {
            setMessage(message)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Agin Plug Emulator</title>
            </Head>
            <div className={classes.home}>
                <PlugView>

                </PlugView>
            </div>
        </>
    )
}
