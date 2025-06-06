import { Poppins } from 'next/font/google';
import "./globals.css";
import { Metadata } from 'next';
import { Navbar } from '@/lib/components';
import Head from 'next/head';

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
    title: 'Agin Energy',
    description: 'Oszczędzaj energię',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </Head>
            <body className={poppins.variable}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
