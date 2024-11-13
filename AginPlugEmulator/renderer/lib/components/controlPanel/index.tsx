import { useState } from "react";
import Input from "../input/Input";
import RangePicker from "../RangePicker";
import classes from './controlpanel.module.css';

export default function ControlPanel() {
    const [voltage, setVoltage] = useState<{ start: number | string, end: number | string }>({ start: 30, end: 35 });
    const [current, setCurrent] = useState<{ start: number | string, end: number | string }>({ start: 0.1, end: 0.12 });
    const [temperature, setTemperature] = useState<{ start: number | string, end: number | string }>({ start: 35, end: 45 });

    return (
        <div className={classes.controlPanelContainer}>
            <RangePicker label="Voltage" setValue1={(e) => setVoltage((v) => ({ ...v, start: e.target.value }))} setValue2={(e) => setVoltage((v) => ({ ...v, end: e.target.value }))} value1={voltage?.start} value2={voltage?.end} unit={'V'} />
            <RangePicker label="Current" setValue1={(e) => setCurrent((v) => ({ ...v, start: e.target.value }))} setValue2={(e) => setCurrent((v) => ({ ...v, end: e.target.value }))} value1={current?.start} value2={current?.end} unit={'A'} />
            <RangePicker label="Voltage" setValue1={(e) => setTemperature((v) => ({ ...v, start: e.target.value }))} setValue2={(e) => setTemperature((v) => ({ ...v, end: e.target.value }))} value1={temperature?.start} value2={temperature?.end} unit={'°C'} />
        </div>
    )
}