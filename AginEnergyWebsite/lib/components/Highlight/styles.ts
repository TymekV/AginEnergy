import { cva } from "@/styled-system/css";

export const highlightStyles = cva({
    base: {
        padding: '8px 16px',
        borderRadius: '10px',
        display: 'flex',
        gap: '5px',
        maxW: 'max-content',
        alignItems: 'center',
    },
    variants: {
        color: {
            green: {
                backgroundColor: 'dimmed.green.6',
                color: 'green.8',
            }
        }
    },
    defaultVariants: {
        color: 'green'
    }
});