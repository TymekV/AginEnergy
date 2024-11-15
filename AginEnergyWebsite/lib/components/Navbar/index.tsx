'use client';
import { IconLeaf } from '@tabler/icons-react';
import { logo, navbarMain, options } from './styles';
import { Title } from '../Title';
import Link from 'next/link';
import { Option } from './Option';
import { usePathname } from 'next/navigation';

export const links = [
    {
        href: '/',
        label: 'Strona główna'
    },
    {
        href: '/docs',
        label: 'Dokumentacja'
    },
    {
        href: '/download',
        label: 'Pobierz'
    },
]

export function Navbar() {
    const pathname = usePathname();

    return (
        <div className={navbarMain}>
            <Link href="/">
                <div className={logo}>
                    <IconLeaf />
                    <Title color='inherit'>Agin Energy</Title>
                </div>
            </Link>
            <div className={options}>
                {links.map(l => <Link key={l.href} href={l.href}><Option label={l.label} active={pathname.split('/')[1] == l.href.split('/')[1]} /></Link>)}
            </div>
        </div>
    )
}