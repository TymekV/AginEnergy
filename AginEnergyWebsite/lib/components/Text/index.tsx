import { HTMLAttributes } from "react";
import { textStyles } from "./styles";

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    size?: 'sm' | 'md' | 'lg',
    color?: 'inherit',
}

export function Text({ children, size = 'md', color }: TitleProps) {
    return (
        <div className={textStyles({ size, color })}>
            {children}
        </div>
    )
}