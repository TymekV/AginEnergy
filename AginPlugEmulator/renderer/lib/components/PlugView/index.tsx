import classes from './PlugView.module.css';

export function PlugView({ children }: { children?: React.ReactNode }) {
    return (
        <div className={classes.view}>
            {children}
        </div>
    )
}