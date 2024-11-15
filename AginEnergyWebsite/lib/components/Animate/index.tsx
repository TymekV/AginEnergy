'use client';
import { useAnimate } from "@/lib/hooks";
import { useRef, ReactNode, HTMLAttributes } from "react";

interface AnimateProps extends HTMLAttributes<HTMLDivElement> {
    delay: number;
    observeRef?: React.RefObject<HTMLElement>;
    children: ReactNode;
}

export function Animate({ delay, observeRef, children, ...props }: AnimateProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const ref = observeRef || elementRef;
    const styles = useAnimate({ delay, ref });

    return (
        <div ref={elementRef} style={styles} {...props}>
            {children}
        </div>
    );
}
