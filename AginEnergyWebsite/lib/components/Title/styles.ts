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
        },
        color: {
            inherit: {
                color: 'inherit',
            }
        }
    },
    defaultVariants: {
        size: 'sm'
    }
});