import classes from './Plug.module.css';

export type PlugProps = {
    on?: boolean,
    glow?: {
        red?: number,
        green?: number,
        blue?: number,
    }
}

export function Plug({ on, glow }: PlugProps) {
    return (
        <div className={classes.outer}>
            <div className={classes.glow} style={{
                backgroundColor: on ? glow ? `rgb(${glow.red}, ${glow.green}, ${glow.blue})` : '#00973C' : '#535353',
            }}>
                <div className={classes.innerBorder}>
                    <div className={classes.outlet}>
                        <div className={classes.dots}>
                            <div className={classes.dot} />
                            <div className={classes.dot} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}