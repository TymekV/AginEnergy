import { HTMLAttributes } from "react";
import { titleStyles } from "./styles";

export interface TitleProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    size?: 'sm' | 'md' | 'lg' | 'h1' | 'h2' | 'h3',
    color?: 'inherit',
    weight?: 600,
}

export function Title({ children, size = 'sm', color, weight }: TitleProps) {
    return (
        <div className={titleStyles({ size, color, weight })}>
            {children}
        </div>
    )
}