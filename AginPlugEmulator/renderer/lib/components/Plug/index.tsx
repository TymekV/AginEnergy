import classes from './Plug.module.css';

export function Plug() {
    return (
        <div className={classes.outer}>
            <div className={classes.glow}>
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