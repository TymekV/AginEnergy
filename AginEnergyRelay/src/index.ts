import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import apn from 'apn';
import path from 'path';
import { ApnsClient, Errors, Notification, NotificationOptions, Priority } from 'apns2';
import fs from 'fs';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import AginToken from './models/AginToken';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
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
    },
    tokens?: {
        token: string,
        nativeToken: string,
        platform: 'android' | 'ios',
        createdAt: Date,
    }[],
    batch?: boolean,
}

const withAginToken = async (req: TokenRequest, res: Response, next: NextFunction) => {
    const { token, tokens } = req.body;
    if (!token && !tokens) {
        res.status(401).json({ error: 'Missing Agin Token' });
        return;
    }
    if (tokens) {
        let tokensData = [];
        if (!(tokens instanceof Array)) {
            res.status(400).json({ error: 'Invalid data type in tokens: expected an array of strings' });
            return;
        }
        for (const t of tokens) {
            const tData = await AginToken.findOne({ token: t }).lean();
            if (!tData) {
                res.status(401).json({ error: `At least one token is invalid (invalid token: ${t})` });
                return;
            }
            tokensData.push(tData);
        }

        req.tokens = tokensData;
        req.batch = true;
    } else {
        const tokenData = await AginToken.findOne({ token }).lean();
        if (!tokenData) {
            res.status(401).json({ error: 'Invalid Agin Token' });
            return;
        }

        req.token = tokenData;
        req.batch = false;
    }
    next();
}

app.post('/notifications', withAginToken, async (req: TokenRequest, res): Promise<any> => {
    const { title, message } = req.body;
    if (!message) return res.status(400).json({ error: 'Notification message is required' });

    if (req.token?.platform == 'ios' || req.batch) {
        const iosObject: NotificationOptions = {
            alert: {
                title: title,
                body: message,
            },
            priority: Priority.immediate,
        };
        if (title && iosObject.data) iosObject.data.title = title;

        if (req.batch) {
            const notifications = req.tokens?.filter(t => t.platform == 'ios')?.map(t => new Notification(t.nativeToken, iosObject));
            try {
                if (notifications && notifications.length > 0) await apnsClient.sendMany(notifications);
            } catch (error) {
                console.log(error);
            }
        } else if (req.token) {
            const bn = new Notification(req.token.nativeToken, iosObject);
            try {
                await apnsClient.send(bn);
            } catch (error) {
                console.log(error);
            }
        }
    }
    if (req.token?.platform == 'android' || req.batch) {
        const androidObject: Message = {
            data: {
                message: message,
            },
            token: '',
        }
        if (title && androidObject.data) androidObject.data.title = title;

        if (req.batch) {
            console.log(req.tokens?.filter(t => t?.platform == 'android'));

            await Promise.all(req.tokens?.filter(t => t?.platform == 'android')?.map(async t => {
                try {
                    await admin.messaging().send({
                        ...androidObject,
                        token: t.nativeToken
                    });
                } catch (error) {
                    console.log(error);
                }
            }) ?? []).catch(e => console.log(e));
        } else if (req.token) {
            try {
                await admin.messaging().send({
                    ...androidObject,
                    token: req.token.nativeToken
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    res.sendStatus(201);
});

apnsClient.on(Errors.error, (err) => {
    console.error(err.reason, err.statusCode, err.notification.deviceToken)
})


httpServer.listen(5344);