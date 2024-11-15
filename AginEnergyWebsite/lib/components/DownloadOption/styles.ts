import { css } from "@/styled-system/css";

export const optionStyles = css({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    borderRadius: '10px',
    border: '1px solid #00000020',
    cursor: 'pointer',
    transition: 'all .3s ease',
    justifyContent: 'space-between',
    '&:hover': {
        borderColor: 'green.8'
    },
    '&:active': {
        borderColor: 'green.6'
    }
});

export const leftStyles = css({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

export const optionLabel = css({
    fontSize: '18px'
});

export const optionDescription = css({
    fontSize: '14px',
    color: 'text.1',
});