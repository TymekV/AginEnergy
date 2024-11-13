import classes from './text.module.css';

export interface LabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: React.ReactNode
}

export default function Label({ children, ...props }: LabelProps) {
    return (
        <div className={classes.label} {...props}>{children}</div>
    )
}