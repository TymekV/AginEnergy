import { Icon } from '@tabler/icons-react';
import classes from './input.module.css'
import { ChangeEventHandler } from 'react';
import Label from '../Label';

export type InputProps = {
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    icon?: Icon;
    label?: string;
    value?: string | number;
    min?: number
}

export default function Input({ placeholder, onChange, icon: Icon, value, label, min }: InputProps) {
    return (
        <div className={classes.inputWrapperWrapper}>
            {label && <Label>{label}</Label>}
            <div className={classes.inputWrapper}>
                {Icon && <Icon color={'#ffffff50'} />}
                <input min={min} value={value} placeholder={placeholder} onChange={onChange} type="number" className={classes.input} />
            </div>
        </div>
    )
}