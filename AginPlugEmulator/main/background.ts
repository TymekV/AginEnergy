import express, { Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 800,
    height: 450,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools()
  }
})()



app.on('window-all-closed', () => {
  app.quit();
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});

const server = express();

let powered = false;

let connection: Response;

ipcMain.on('power', async (event, arg: boolean) => {
  powered = arg;
  event.reply('update', powered);
  const relay = JSON.stringify({ id: 'switch-relay', value: powered });
  if (connection != undefined || connection != null)
    connection.write(`event: state\ndata: ${relay}\n\n`);
});

server.get('/', (req, res) => {
  const response = { emulator: true }
  res.json(response);
});

server.get('/events', (req, res) => {
  connection = res;
  // Set headers to keep the connection open
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a message immediately after the connection is opened
  res.write('data: Connection established\n\n');

  // Send periodic messages
  const interval = setInterval(() => {

    if (powered) {

      const voltageValue = crypto.randomInt(23000, 25000) / 100;
      const currentValue = crypto.randomInt(1000, 2000) / 10000;
      const powerValue = voltageValue * currentValue;
      const temperatureValue = crypto.randomInt(3000, 3500) / 100;

      const voltage = JSON.stringify({ id: 'sensor-voltage', value: voltageValue });
      const current = JSON.stringify({ id: 'sensor-current', value: currentValue });
      const power = JSON.stringify({ id: 'sensor-power', value: powerValue });
      const temperature = JSON.stringify({ id: 'sensor-temperature', value: temperatureValue });
      res.write(`event: state\ndata: ${voltage}\n\n`);
      res.write(`event: state\ndata: ${current}\n\n`);
      res.write(`event: state\ndata: ${power}\n\n`);
      res.write(`event: state\ndata: ${temperature}\n\n`);

    }

  }, 10000);

  // Handle client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

server.listen(54321, () => {
  console.log('Server running at http://localhost:54321');
});
