import { useEffect, useState } from 'react';
import dgram from 'react-native-udp';

export type HubDevice = {
    ip: string,
    hostname: string,
    serialNumber: string,
    timestamp: number,
}

export function useHubScanner() {
    const [devices, setDevices] = useState<HubDevice[]>([]);

    useEffect(() => {
        const socket = dgram.createSocket({ type: 'udp4' });
        socket.bind(5014);

        socket.on('message', function (msg, rinfo) {
            const message = msg.toString();

            if (!message.startsWith('AginHubDiscovery')) return;

            const [type, hostname, serialNumber] = message.split('/');

            const n = {
                ip: rinfo?.address,
                hostname,
                serialNumber,
                timestamp: Date.now(),
            }

            setDevices(s => {
                // Check if the new object's IP already exists in the array
                const ipExists = s.some(obj => obj.ip === n.ip);

                // If the IP doesn't exist, add the new object to the array
                if (!ipExists) {
                    return [...s, n];
                }

                // If the IP exists, update the timestamp of the existing object
                const updatedObjects = s.map(obj =>
                    obj.ip === n.ip ? { ...n, timestamp: Date.now() } : obj
                );

                return updatedObjects;
            });
        });

        return () => {
            socket.close();
        }
    }, []);

    useEffect(() => {
        // Remove inactive items every 5 seconds
        const intervalId = setInterval(() => {
            setDevices(prevObjects => {
                const currentTime = Date.now();
                return prevObjects.filter(obj => currentTime - obj.timestamp <= 3000);
            });
        }, 3000);

        // Cleanup the interval
        return () => clearInterval(intervalId);
    }, []);

    return devices;
}