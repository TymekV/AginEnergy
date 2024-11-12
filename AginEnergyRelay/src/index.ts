import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import apn from 'apn';
import path from 'path';
import { ApnsClient, Errors, Notification } from 'apns2';
import fs from 'fs';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import AginToken from './models/AginToken';
// import { Discovery } from 'esphome-native-api';

dotenv.config();

const app = express();

const httpServer = createServer(app);

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/aginenergyrelay');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
console.log(path.join(__dirname, 'keys', 'apns.p8'));

// const apnOptions: apn.ProviderOptions = {
//     token: {
//         key: path.join(__dirname, 'keys', 'AuthKey_3QTCQ4XR6A.p8'),
//         keyId: '3QTCQ4XR6A',
//         teamId: '64X57WU2MF',
//     },
//     production: false
// }
// // 63ab3b16181c29d927155d8b7b8a882b8d78ee5e03de0fb61c900764b50d82be
// const apnProvider = new apn.Provider(apnOptions);
const apnsClient = new ApnsClient({
    host: 'api.sandbox.push.apple.com',
    team: `64X57WU2MF`,
    keyId: `3QTCQ4XR6A`,
    signingKey: fs.readFileSync(path.join(__dirname, 'keys', 'apns.p8')),
    defaultTopic: 'rocks.agin.AginEnergyMobile',
    requestTimeout: 0, // optional, Default: 0 (without timeout)
    keepAlive: true, // optional, Default: 5000
});

const firebaseApp = admin.initializeApp({
    credential: cert(path.join(__dirname, 'keys', 'firebase.json')),
});

app.get('/', async (req, res) => {
    res.json({ api: true });
});

app.post('/notifications/tokens', async (req, res) => {
    const { platform, nativeToken } = req.body;
    if (platform != 'android' && platform != 'ios') {
        res.status(400).json({
            error: 'Invalid value for platform: expected android | ios',
        });
        return;
    }
    if (!nativeToken) {
        res.status(400).json({
            error: 'Missing nativeToken field',
        });
        return;
    }

    const existingToken = await AginToken.findOne({
        nativeToken,
    });
    if (existingToken) {
        res.json({ token: existingToken.token, alreadyExisted: true });
        return;
    }

    const tokenBase = nanoid(63);
    const token = `${platform == 'android' ? 'A' : 'I'}${tokenBase}`;

    await AginToken.create({
        platform,
        nativeToken,
        token,
    });

    res.json({ token, alreadyExisted: false });
});

interface TokenRequest extends Request {
    token?: {
        token: string,
        nativeToken: string,
        platform: 'android' | 'ios',
        createdAt: Date,
    }
}

const withAginToken = async (req: TokenRequest, res: Response, next: NextFunction) => {
    const { token } = req.body;
    if (!token) {
        res.status(401).json({ error: 'Missing Agin Token' });
        return;
    }
    const tokenData = await AginToken.findOne({ token });
    if (!tokenData) {
        res.status(401).json({ error: 'Invalid Agin Token' });
        return;
    }

    req.token = tokenData;
    next();
}

app.post('/notifications', withAginToken, async (req: TokenRequest, res) => {
    if (req.token?.platform == 'ios') {
        const bn = new Notification(req.token.nativeToken, {
            alert: {
                title: 'Wyłącz ten telewizor!',
                body: 'Wyłączaj!',
            }
        });

        await apnsClient.send(bn);
    } else if (req.token?.platform == 'android') {
        await admin.messaging().send({
            data: {
                title: 'Wyłącz ten telewizor!',
                message: 'Wyłączaj!'
            },
            token: req.token.nativeToken
        });
        console.log('Android not supported yet');
    }

    res.sendStatus(201);
});

apnsClient.on(Errors.error, (err) => {
    console.error(err.reason, err.statusCode, err.notification.deviceToken)
})


httpServer.listen(5344);