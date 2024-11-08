import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import { BucketsAPI } from '@influxdata/influxdb-client-apis';
import { InfluxDB } from '@influxdata/influxdb-client';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://admin:adminadmin@localhost:27017/agin');

const influx = new InfluxDB({
    url: process.env.INFLUXDB_URL || 'http://localhost:8086',
    token: process.env.INFLUXDB_TOKEN,
});

const queryApi = influx.getQueryApi('agin');

const httpServer = createServer(app);
const io = new Server(httpServer);



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const data = await queryApi.collectRows('from(bucket: "usage") |> range(start: 1970-01-01T00:00:00Z) |> last()');
    res.json(data);
})

httpServer.listen(12345);