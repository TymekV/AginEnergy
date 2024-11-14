import express, { Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

let window: Electron.CrossProcessExports.BrowserWindow;
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
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  window = mainWindow;

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

let voltageSetting :{ start: number, end: number} = {start: 230, end: 240}
let currentSetting :{ start: number, end: number} = {start: 0.1, end: 0.12}
let temperatureSetting :{ start: number, end: number} = {start: 35, end: 45}

ipcMain.on('power', async (event, arg: boolean) => {
  powered = arg;
  event.reply('update', powered);
  const relay = JSON.stringify({ id: 'switch-relay', value: powered });
  if (connection != undefined || connection != null)
    connection.write(`event: state\ndata: ${relay}\n\n`);
});

ipcMain.on('voltageChange', async (event, value: { start: number, end: number}) => {
  voltageSetting = value;
})
ipcMain.on('currentChange', async (event, value: { start: number, end: number}) => {
  currentSetting = value;
})
ipcMain.on('temperatureChange', async (event, value: { start: number, end: number}) => {
  temperatureSetting = value;
})

server.get('/', (req, res) => {
  const response = { emulator: true }
  res.json(response);
});

server.post('/switch/relay/turn_on', (req, res) => {
  // console.log('power on');
  window.webContents.send('remotePower', true)
  powered = true;
});

server.post('/light/plug_lights/turn_on', (req, res) => {
  const { r, g, b, white_value }= req.query;
  window.webContents.send('colorChange', { red: r, green: g, blue: b });
});

server.post('/switch/relay/turn_off', (req, res) => {
  // console.log('power off');
  window.webContents.send('remotePower', false);
  powered = false;
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
    console.log(voltageSetting);
    console.log(currentSetting);
    console.log(temperatureSetting);

    const temperatureStartValue = Math.round(temperatureSetting.start * 100)
    const temperatureEndValue = Math.round((temperatureSetting.end > temperatureSetting.start ? temperatureSetting.end : temperatureSetting.start ) * 100) > temperatureStartValue ? Math.round((temperatureSetting.end > temperatureSetting.start ? temperatureSetting.end : temperatureSetting.start ) * 100) : temperatureStartValue +1;

    const voltageStartValue = Math.round(voltageSetting.start * 100)
    const voltageEndValue = Math.round((voltageSetting.end > voltageSetting.start ? voltageSetting.end : voltageSetting.start ) * 100) > voltageStartValue ? Math.round((voltageSetting.end > voltageSetting.start ? voltageSetting.end : voltageSetting.start ) * 100) : voltageStartValue +1;

    const currentStartValue = Math.round(currentSetting.start * 100)
    const currentEndValue = Math.round((currentSetting.end > currentSetting.start ? currentSetting.end : currentSetting.start ) * 100) > currentStartValue ? Math.round((currentSetting.end > currentSetting.start ? currentSetting.end : currentSetting.start ) * 100) : currentStartValue +1;


    if (powered) {

      const voltageValue = crypto.randomInt(voltageStartValue, voltageEndValue) / 100;
      const currentValue = crypto.randomInt(currentStartValue, currentEndValue) / 100;
      const powerValue = voltageValue * currentValue;
      const temperatureValue = crypto.randomInt(temperatureStartValue, temperatureEndValue) / 100;

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


const { networkInterfaces } = require('os');

const getIPAddress = () => {
  const nets = networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Retrieve only IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  
  // Return the first IP address for the first NIC found
  const nicNames = Object.keys(results);
  if (nicNames.length > 0) {
    const firstNICAddresses = results[nicNames[0]];
    if (firstNICAddresses.length > 0) {
      return firstNICAddresses[0];
    }
  }
  
  // No IP address found
  return null;
};

ipcMain.on('ip', async (event) => {
  const ipAddress = getIPAddress();
  event.reply('ip', ipAddress);
  
});