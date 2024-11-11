import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }) {
    return (
        <main className={poppins.className}>
            <Component {...pageProps} />
        </main>
    )
}