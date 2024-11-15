'use client';
import { Animate } from "@/lib/components";
import { css } from "@/styled-system/css"

function Player({ src }: { src: string }) {
    return (
        <iframe className={frameStyles} width="560" height="315" allowFullScreen={true} src={src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
    )
}

export default function Videos() {
    return (
        <div className={pageStyles}>
            <div className={videosStyles}>
                <Animate delay={0}>
                    <Player src="https://www.youtube.com/embed/1xTRd-yT9cw?si=XYFVBw_MOpjzbgdX" />
                    <Player src="https://www.youtube.com/embed/pNSsvwLYe4k?si=-AjoPrzFA-sRCewj" />
                </Animate>
            </div>
        </div>
    )
}

const pageStyles = css({
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 20px',
    marginTop: '60px',
});

const videosStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
})

const frameStyles = css({
    borderRadius: '15px',
})