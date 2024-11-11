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

app.get('/plugs/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Plug.findOne({ id });
    if (!data) {
        res.status(404).json({ error: 'Plug not found' });
        return;
    }
    res.json(data);
});

app.get('/plugs', async (req, res) => {
    const data = await Plug.find();
    res.json(data);
});

app.get('/plugs/stats/:plugId', async (req, res) => {
    const {plugId} = req.params;
    const {measurement} = req.query;

    if(!plugId || !measurement) {
        res.status(400).json({error: 'Fields are missing'})
        return;
    };
 
    let querymeasurement: string = '';
    if(measurement == 'current'){
        querymeasurement += 'r["_measurement"] == "current"';
    }
    else if(measurement == 'power'){
        querymeasurement.length > 0 ? querymeasurement += ' or ' : undefined;
        querymeasurement += 'r["_measurement"] == "power"';
    }
    else if(measurement == 'temperature'){
        querymeasurement.length > 0 ? querymeasurement += ' or ' : undefined;
        querymeasurement += 'r["_measurement"] == "temperature"';
    }
    else if(measurement == 'voltage'){
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

        console.log(data);
        
        //@ts-ignore
        const chartData = data.map((d : {_value: number}) => { 
        if(d?._value != null && measurement== 'power'){
        mean+= (d?._value * 0.25)
        }else if(d?._value != null && measurement== 'current'){
        mean+= (d?._value * 0.25)
        }else if (d?._value != null ){
        mean += d?._value; 
        count++; 
        }
        return{value: d?._value == null ? 0 : d?._value};});

        if(measurement == 'temperature'){
            mean /= count;
        }
        else if(measurement == 'voltage'){
            mean /= count;
        }

    res.json({chartData, mean: mean.toFixed(2)});
});


const plugs = ['jonczorplug', 'edgeserver']

plugs.forEach(element => {
    insertPlug(element)
});

function insertPlug(element: string) {
    const es = new EventSource(`http://${element}:6969/events`);

    let plugData: { id?: string, 'voltage'?: number, 'power'?: number, 'temperature'?: number, 'current'?: number } = {};

    es.addEventListener('state', async (data) => {
        const { id, value } = JSON.parse(data.data);

        let point;

        if (!plugData.id) {
            plugData.id = element;
        }

        if (Object.keys(plugData).length == 5) {
            console.log(plugData);
            io.emit('state', plugData);
            plugData = {};
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
        } else {
            return;
        }

        // io.emit('state', element,JSON.parse(data.data));

        writeApi.writePoint(point);

        await writeApi.flush();


    });
}





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