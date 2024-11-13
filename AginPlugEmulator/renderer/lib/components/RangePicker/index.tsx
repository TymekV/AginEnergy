import { ChangeEventHandler } from "react";
import Input from "../input/Input";
import classes from './rangePicker.module.css';

export type RangePickerProps = {
    label?: string,
    value1: number | string,
    setValue1?: ChangeEventHandler<HTMLInputElement>,
    value2: number | string,
    setValue2?: ChangeEventHandler<HTMLInputElement>,
    unit?: string,
}

export default function RangePicker({ label, value1, setValue1, value2, setValue2, unit }: RangePickerProps) {
    return (
        <div className={classes.rangePickerContainer}>
            <Input value={value1} label={label} onChange={setValue1} />
            <div className={classes.spacer}>-</div>
            <Input value={value2} onChange={setValue2} label={label} />
            <div className={classes.spacer}>{unit}</div>
        </div>
    )
}