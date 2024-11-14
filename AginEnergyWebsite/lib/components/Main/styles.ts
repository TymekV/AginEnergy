import { css, cva } from "@/styled-system/css";

export const mainStyles = css({
    display: 'flex',
    width: '1500px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: {
        md: '30px',
        lg: '50px',
        xl: '100px'
    },
});

export const mainContainer = cva({
    base: {
        // padding: '60px 120px',
        padding: '60px 40px',
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        borderBottom: '1px solid #00000020'
    },
});