import { HTMLAttributes } from "react";
import { titleStyles } from "./styles";

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    size?: 'sm' | 'md' | 'lg',
    color?: 'inherit',
}

export function Title({ children, size = 'sm', color }: TitleProps) {
    return (
        <div className={titleStyles({ size, color })}>
            {children}
        </div>
    )
}