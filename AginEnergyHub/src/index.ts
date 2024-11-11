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
// import { Discovery } from 'esphome-native-api';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/agin');

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

app.get('/', async (req, res) => {
    const data = await queryApi.collectRows('from(bucket: "usage") |> range(start: 1970-01-01T00:00:00Z) |> last()');
    res.json(data);
})

app.post('/plugs', async (req, res) => {
    const { id, label } = req.body;
    const data = await Plug.findOneAndUpdate({ id }, { id, label }, { upsert: true, returnDocument: 'after' });
    res.status(201).json(data);
});

app.get('/plugs', async (req, res) => {
    const data = await Plug.find();
    res.json(data);
});

const es = new EventSource('http://jonczorplug:6969/events');

es.addEventListener('state', async (data) => {
    const { id, value } = JSON.parse(data.data);

    let point;

    if (id == 'sensor-voltage') {
        point = new Point('voltage')
            .tag('plug', 'inteligentna_wtyczka')
            .floatField('value', value)
    } else if (id == 'sensor-current') {
        point = new Point('current')
            .tag('plug', 'inteligentna_wtyczka')
            .floatField('value', value)
    } else if (id == 'sensor-power') {
        point = new Point('power')
            .tag('plug', 'inteligentna_wtyczka')
            .floatField('value', value)
    } else if (id == 'sensor-temperature') {
        point = new Point('temperature')
            .tag('plug', 'inteligentna_wtyczka')
            .floatField('value', value)
    } else {
        return;
    }

    io.emit('state', 'jonczor', JSON.parse(data.data));

    writeApi.writePoint(point);

    await writeApi.flush();

    console.log({ id, value });

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
    serialNumber: 2137,
});

httpServer.listen(12345);