import { cva } from "@/styled-system/css";

export const textStyles = cva({
    base: {
        fontWeight: 500,
        color: 'text.1',
    },
    variants: {
        size: {
            sm: {
                fontSize: '15px',
            },
            md: {
                fontSize: '18px',
            },
            lg: {
                fontSize: '25px',
            },
        },
        color: {
            inherit: {
                color: 'inherit',
            }
        }
    },
    defaultVariants: {
        size: 'md'
    }
});