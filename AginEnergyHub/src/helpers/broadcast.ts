import dgram from 'dgram';
import os from 'os';
import broadcastAddress from 'broadcast-address';

type BroadcastOptions = {
    serialNumber: number;
    hostname: string;
};

export function startBroadcasting({ serialNumber, hostname }: BroadcastOptions): void {
    let broadcasts: string[] = [];

    const udpServer = dgram.createSocket('udp4');

    udpServer.bind(3056, () => {
        udpServer.setBroadcast(true);
        broadcastGen();

        setInterval(() => {
            broadcastNew();
        }, 1000);
    });

    function broadcastGen(): void {
        const interfaces = os.networkInterfaces();
        Object.keys(interfaces).forEach((iface) => {
            const ifaceInfo = interfaces[iface];
            if (!ifaceInfo) return;

            let hasIPv4 = false;
            ifaceInfo.forEach((addressInfo) => {
                if (addressInfo?.family === 'IPv4') {
                    hasIPv4 = true;
                }
            });

            if (hasIPv4) {
                const ba = broadcastAddress(iface);
                if (ba !== '') {
                    console.log(ba);
                    
                    broadcasts.push(ba);
                }
            }
        });
    }

    function broadcastNew(): void {
        const message = Buffer.from(`AginHubDiscovery/${hostname}/${serialNumber}`);
        broadcasts.forEach((ba) => {
            udpServer.send(message, 0, message.length, 5014, ba, () => {
                // console.log('Message sent to ' + ba + ', length = ' + message.length);
            });
        });
    }
}
