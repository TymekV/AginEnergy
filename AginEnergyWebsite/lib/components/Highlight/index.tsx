import { HTMLAttributes } from "react";
import { highlightStyles } from "./styles";
import { Icon } from '@tabler/icons-react';

export interface HighlightProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    color?: 'green',
    icon?: Icon
}

export function Highlight({ children, color = 'green', icon: Icon }: HighlightProps) {
    return (
        <div className={highlightStyles({ color })}>
            {Icon && <Icon size={32} />}
            {children}
        </div>
    )
}