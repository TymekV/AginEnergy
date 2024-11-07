import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));


httpServer.listen(42069);