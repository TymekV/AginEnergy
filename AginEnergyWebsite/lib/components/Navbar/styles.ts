import { css } from '@/styled-system/css';

export const navbarMain = css({
    position: 'fixed',
    left: '0px',
    right: '0px',
    top: '0px',
    height: '60px',
    borderBottom: '1px solid #00000020',
    zIndex: 999999,
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
});

export const logo = css({
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: 'green.8',
    cursor: 'pointer',
});

export const options = css({
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
});