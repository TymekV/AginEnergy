import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { BucketsAPI } from '@influxdata/influxdb-client-apis';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plug from './models/Plug';
import EventSource from 'eventsource';
import { startBroadcasting } from './helpers/broadcast';
import os from 'os';
import PushToken from './models/PushToken';
import axios from 'axios';
import { error } from 'console';
// import { Discovery } from 'esphome-native-api';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/agin');

const relayUrl = process.env.RELAY_URL || 'https://energyapi.agin.rocks';

const influx = new InfluxDB({
    url: process.env.INFLUXDB_URL || 'http://localhost:8086',
    token: process.env.INFLUXDB_TOKEN,
});

const queryApi = influx.getQueryApi('agin');
const writeApi = influx.getWriteApi('agin', 'usage');

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('new Connection', socket.handshake.address);

});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

let plugs: { id: string, on?: boolean, label: string }[] = [];

function validateIPaddress(ipaddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/.test(ipaddress)) {
        return true;
    }
    return false;
}

function constructPlugUrl(hostname: string) {
    const finalUrl = `http://${(validateIPaddress(hostname) || hostname == 'localhost') ? hostname : `${hostname}.local`}`;
    return finalUrl;
}

type Notification = {
    title?: string,
    message: string,
}

async function sendNotification({ title, message }: Notification) {
    const tokens = (await PushToken.find()).map(x => x.token);

    const res = await axios.post(`${relayUrl}/notifications`, {
        title,
        message,
        tokens,
    });
}

(async () => {

    const database = await Plug.find<{ id: string, label: string }>();
    database.map((m) => plugs.push({ id: m?.id, on: false, label: m?.label }));
    console.log(plugs);

    // plugs.forEach(element => {
    //     insertPlug(element.id, 0)
    // });

    for (let i = 0; i < plugs.length; i++) {
        insertPlug(plugs[i].id, i)
    }

    function insertPlug(element: string, index: number) {

        const es = new EventSource(`${constructPlugUrl(element)}/events`);

        let plugData: { id?: string, 'voltage'?: number, 'power'?: number, 'temperature'?: number, 'current'?: number } = {};

        es.addEventListener('state', async (data) => {
            const { id, value } = JSON.parse(data.data);
            if (value == undefined) return; //Nie lubię JS pozdrawiam ~Michał Ziernik 23:10 Nov 12 2024

            // console.log(id);

            let point;

            if (!plugData.id) {
                plugData.id = element;
            }

            if (id == 'sensor-voltage') {
                point = new Point('voltage')
                    .tag('plug', element)
                    .floatField('value', value);
                plugData.voltage = value.toFixed(2);
            } else if (id == 'sensor-current') {
                point = new Point('current')
                    .tag('plug', element)
                    .floatField('value', value)
                plugData.current = value.toFixed(2);
            } else if (id == 'sensor-power') {
                point = new Point('power')
                    .tag('plug', element)
                    .floatField('value', value);
                plugData.power = value.toFixed(2);
            } else if (id == 'sensor-temperature') {
                point = new Point('temperature')
                    .tag('plug', element)
                    .floatField('value', value)
                plugData.temperature = value.toFixed(2);
            } else if (id == 'switch-relay') {
                if (value == true) {
                    plugs[index].on = true;
                    io.emit('on', plugs[index].id);
                } else if (value == false) {
                    plugs[index].on = false;
                    io.emit('off', plugs[index].id);
                }
            } else {
                return;
            }



            // io.emit('state', element,JSON.parse(data.data));

            if (point) {
                writeApi.writePoint(point);
                await writeApi.flush();
            }

            if (Object.keys(plugData).length == 5) {
                // console.log(plugData);
                io.emit('state', plugData);
                plugData = {};
            }
        });
    }

})();

app.get('/', async (req, res) => {
    const data = await queryApi.collectRows('from(bucket: "usage") |> range(start: 1970-01-01T00:00:00Z) |> last()');
    res.json(data);
})

app.post('/plugs', async (req, res) => {
    const { id, label } = req.body;
    const data = await Plug.findOneAndUpdate<{ id: string, label: string }>({ id }, { id, label }, { upsert: true, returnDocument: 'after' });
    plugs.push({ id: data?.id, on: false, label: data?.label });
    io.emit('update', plugs);
    res.status(201).json(data);
});

app.get('/plugs/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Plug.findOne({ id });
    if (!data) {
        res.status(404).json({ error: 'Plug not found' });
        return;
    }
    res.json(data);
});

app.patch('/plugs/:id', async (req, res): Promise<any> => {
    const { id } = req.params;
    const { on, r, g, b, white_value } = req.body;

    // console.log('body:', req.body);

    if (on == undefined) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const index = plugs.findIndex((f) => f?.id == id)
    if (index == -1) {
        return res.status(400).json({ error: 'Id is not valid' });
    }

    //TODO:Better error comunication
    if (on == 'true' || on == true) {
        await axios.post(`${constructPlugUrl(id)}/switch/relay/turn_on`, {}, {
            params: {
                r, g, b, white_value,
            }
        }).then(() => { plugs[index].on = true; io.emit('on', plugs[index].id); }, () => console.log('Error when reaching plug'));
    } else if (on == 'false' || on == false) {
        await axios.post(`${constructPlugUrl(id)}/switch/relay/turn_off`).then(() => { plugs[index].on = false; io.emit('off', plugs[index].id); }, () => { });
    }

    return res.sendStatus(200);
});

app.patch('/plugs/:id/color', async (req, res): Promise<any> => {
    const { id } = req.params;
    const { r, g, b, white_value } = req.body;

    const index = plugs.findIndex((f) => f?.id == id)
    if (index == -1) {
        return res.status(400).json({ error: 'Id is not valid' });
    }
    await axios.post(`${constructPlugUrl(id)}/light/plug_lights/turn_on`, {}, {
        params: {
            r, g, b, white_value,
        }
    }).catch((e) => console.log(e));

    return res.sendStatus(200);
});

app.delete('/plugs/:id', async (req, res): Promise<any> => {
    const { id } = req.params;

    const index = plugs.findIndex((f) => f?.id == id)
    if (index == -1) {
        return res.status(400).json({ error: 'Id is not valid' });
    }

    await axios.post(`${constructPlugUrl(id)}/button/restart_with_factory_default_settings/press`, {});

    await Plug.deleteOne({ id });

    res.sendStatus(201);
})

// 'http://inteligentna_wtyczka.local/light/plug_lights/turn_on?brightness=255&r=0&g=255&b=255&white_value=0'

app.get('/plugs', async (req, res) => {
    // const data = await Plug.find();
    res.json(plugs);
});

app.get('/plugs/stats/all', async (req, res) => {

    const yesterday = new Date(Date.now() - 864e5);

    const data = await queryApi.collectRows<{ plug: string, _value: number }>(`from(bucket: "usage")  |> range(start: ${yesterday.toJSON()})  
    |> filter(fn: (r) => r["_measurement"] == "power")  
    |> filter(fn: (r) => r["_field"] == "value")  
    |> group(columns: ["plug"])
    |> aggregateWindow(every: 15m, fn: mean, createEmpty: true)
    |> yield(name: "mean")`);

    const transformedData: { [key: string]: number } = {};

    data.forEach((row) => {
        const plug = row?.plug;
        const value = row?._value == null ? 0 : row?._value;

        if (!transformedData[plug]) {
            transformedData[plug] = 0;
        }

        transformedData[plug] += value * 0.25;
    });

    Object.keys(transformedData).forEach(element => {
        transformedData[element] = Math.round(transformedData[element] * 100) / 100
    });

    const sortable = Object.entries(transformedData)
        .sort(([, a], [, b]) => a - b)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});


    res.json(sortable);
});

app.get('/plugs/stats/:plugId', async (req, res) => {
    const { plugId } = req.params;
    const { measurement } = req.query;

    if (!plugId || !measurement) {
        res.status(400).json({ error: 'Fields are missing' })
        return;
    };

    let querymeasurement: string = '';
    if (measurement == 'current') {
        querymeasurement += 'r["_measurement"] == "current"';
    }
    else if (measurement == 'power') {
        querymeasurement.length > 0 ? querymeasurement += ' or ' : undefined;
        querymeasurement += 'r["_measurement"] == "power"';
    }
    else if (measurement == 'temperature') {
        querymeasurement.length > 0 ? querymeasurement += ' or ' : undefined;
        querymeasurement += 'r["_measurement"] == "temperature"';
    }
    else if (measurement == 'voltage') {
        querymeasurement.length > 0 ? querymeasurement += ' or ' : undefined;
        querymeasurement += 'r["_measurement"] == "voltage"';
    }

    const yesterday = new Date(Date.now() - 864e5);
    // console.log(yesterday.toJSON());



    const data = await queryApi.collectRows(`from(bucket: "usage")  |> range(start: ${yesterday.toJSON()})  
        |> filter(fn: (r) => ${querymeasurement})  
        |> filter(fn: (r) => r["_field"] == "value")  
        |> filter(fn: (r) => r["plug"] == "${plugId}")  
        |> aggregateWindow(every: 15m, fn: mean, createEmpty: true)
        |> yield(name: "mean")`);


    let mean = 0;
    let count = 0;

    // console.log(data);

    //@ts-ignore
    const chartData = data.map((d: { _value: number }) => {
        if (d?._value != null && measurement == 'power') {
            mean += (d?._value * 0.25)
        } else if (d?._value != null && measurement == 'current') {
            mean += (d?._value * 0.25)
        } else if (d?._value != null) {
            mean += d?._value;
            count++;
        }
        return { value: d?._value == null ? 0 : d?._value };
    });

    if (measurement == 'temperature') {
        mean /= count;
    }
    else if (measurement == 'voltage') {
        mean /= count;
    }

    res.json({ chartData, mean: mean.toFixed(2) });
    // res.json(data)
});



app.put('/push/tokens', async (req, res): Promise<any> => {
    const { aginToken } = req.body;
    if (!aginToken) return res.status(400).json({ error: 'Missing aginToken' });

    const existingToken = await PushToken.findOne({ token: aginToken });
    if (existingToken) return res.sendStatus(200);

    await PushToken.create({
        token: aginToken,
    });

    res.sendStatus(201);
});



// const discovery = new Discovery();
// discovery.on('info', console.log);
// /*
// {
//     mac: '240ac45eebd4',
//     host: 'esp32_binary_fan.local',
//     version: '1.16.1',
//     address: '192.168.0.144',
//     family: 'IPv4'
// }
// */
// discovery.run();

startBroadcasting({
    hostname: os.hostname().replace(/\.lan$/, '.local'),
    serialNumber: 6969,
});

httpServer.listen(12345);