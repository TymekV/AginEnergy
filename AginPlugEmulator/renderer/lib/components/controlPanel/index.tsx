import { useCallback, useEffect, useState } from "react";
import Input from "../input/Input";
import RangePicker from "../RangePicker";
import classes from './controlpanel.module.css';
import Label from "../Label";
import os from 'os';

export default function ControlPanel() {
    const [voltage, setVoltage] = useState<{ start: number | string, end: number | string }>({ start: 230, end: 240 });
    const [current, setCurrent] = useState<{ start: number | string, end: number | string }>({ start: 0.1, end: 0.12 });
    const [temperature, setTemperature] = useState<{ start: number | string, end: number | string }>({ start: 35, end: 45 });

    useEffect(() => { window.ipc.send('voltageChange', voltage) }, [voltage]);
    useEffect(() => { window.ipc.send('currentChange', current) }, [current]);
    useEffect(() => { window.ipc.send('temperatureChange', temperature) }, [temperature]);

    const [ip, setIp] = useState(undefined);

    useEffect(() => {
        window.ipc.send('ip', undefined);
        window.ipc.on('ip', (ip) => {
            setIp(ip);
        });
    }, [])


    return (
        <div className={classes.controlPanelContainer}>
            <Label>IP: {ip}</Label>
            <Label>PORT: 54321</Label>
            <RangePicker label="Voltage" setValue1={(e) => setVoltage((v) => ({ ...v, start: e.target.value }))} setValue2={(e) => setVoltage((v) => ({ ...v, end: e.target.value }))} value1={voltage?.start} value2={voltage?.end} unit={'V'} />
            <RangePicker label="Current" setValue1={(e) => setCurrent((v) => ({ ...v, start: e.target.value }))} setValue2={(e) => setCurrent((v) => ({ ...v, end: e.target.value }))} value1={current?.start} value2={current?.end} unit={'A'} />
            <RangePicker label="Temperature" setValue1={(e) => setTemperature((v) => ({ ...v, start: e.target.value }))} setValue2={(e) => setTemperature((v) => ({ ...v, end: e.target.value }))} value1={temperature?.start} value2={temperature?.end} unit={'°C'} />
        </div>
    )
}