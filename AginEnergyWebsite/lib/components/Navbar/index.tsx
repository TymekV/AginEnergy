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
        href: '/videos',
        label: 'Filmy'
    },
    {
        href: '/download',
        label: 'Pobierz'
    },
    {
        href: 'https://github.com/TymekV/AginEnergy',
        label: 'GitHub',
        active: false
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
                {links.map(l => <Link key={l.href} href={l.href}><Option label={l.label} active={l.active ?? pathname.split('/')[1] == l.href.split('/')[1]} /></Link>)}
            </div>
        </div>
    )
}