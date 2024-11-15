'use client';
import { useEffect, useRef } from "react";
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { css } from "@/styled-system/css";

export function Player(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
    const videoRef = useRef(null);

    useEffect(() => {
        // @ts-expect-error Ref is not correctly typed in Plyr
        new Plyr(videoRef.current);
    }, []);

    return (
        <div className={playerStyles}>
            <video ref={videoRef} {...props} />
        </div>
    )
}

const playerStyles = css({
    '--plyr-color-main': 'colors.green.8',
    width: '800px',
    borderRadius: '10px',
    overflow: 'hidden'
});