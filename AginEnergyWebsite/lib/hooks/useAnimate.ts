'use client';
import { useEffect, useState } from "react";

interface UseAnimateProps {
    delay?: number;
    ref: React.RefObject<HTMLElement>;
}

export function useAnimate({ delay, ref }: UseAnimateProps) {
    const styles = {
        transition: {
            transition: 'transform 0.5s ease, filter 0.5s ease, opacity 0.5s ease',
            opacity: 0,
            transform: 'translateX(-50px)',
            transitionDelay: `${delay ?? 0}ms`,
            filter: 'blur(2px)',
        },
        animate: {
            opacity: 1,
            transform: 'translateX(0px)',
            filter: 'blur(0px)',
        },
    };

    // const [observer, setObserver] = useState<IntersectionObserver | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observerInstance = new IntersectionObserver(
            entries => setVisible(entries[0].isIntersecting),
            {
                threshold: 0.2,
                root: document,
                rootMargin: '100000px 0px 0px 0px',
            }
        );

        // setObserver(observerInstance);
        observerInstance.observe(ref.current);

        return () => {
            observerInstance.disconnect();
            // setObserver(null);
        };
    }, [ref]);

    return {
        ...styles.transition,
        ...(visible ? styles.animate : {}),
    };
}
