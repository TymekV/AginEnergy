import { Icon } from '@tabler/icons-react';
import classes from './ActionIcon.module.css';
import { HTMLAttributes } from 'react';

export interface ActionIconProps extends HTMLAttributes<HTMLDivElement> {
    icon: Icon,
}

export function ActionIcon({ icon: Icon, ...props }: ActionIconProps) {
    return (
        <div className={classes.container} {...props}>
            <Icon size={24} color="#0bae4a" />
        </div>
    )
}