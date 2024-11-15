import { cva } from "@/styled-system/css";

export const titleStyles = cva({
    base: {
        fontWeight: 500,
        color: 'text.0',
    },
    variants: {
        size: {
            sm: {
                fontSize: '20px',
            },
            md: {
                fontSize: '25px',
            },
            lg: {
                fontSize: '30px',
            },
            'h1': {
                fontSize: '32px',
            },
            'h2': {
                fontSize: '24px',
            },
            'h3': {
                fontSize: '20px',
            },
        },
        color: {
            inherit: {
                color: 'inherit',
            }
        },
        weight: {
            600: {
                fontWeight: 600
            }
        }
    },
    defaultVariants: {
        size: 'sm'
    }
});