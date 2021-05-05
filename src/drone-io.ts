import { UdpSocket } from './udp-socket';

const DRONE_HOST = '192.168.10.1';
const DRONE_IO_PORT = 8889;

export class DroneIO {
    private _socket: UdpSocket;

    constructor() {
        this._socket = new UdpSocket(DRONE_IO_PORT, DRONE_HOST);
        this.addSocketEvents();
    }

    private addSocketEvents() {
        this._socket.addSocketListener('error', this.onSocketError.bind(this));
        this._socket.addSocketListener('message', this.onSocketMsg.bind(this));
    }

    private onSocketError(err: Error) {
        console.error(`Drone IO error: ${err}`);
        this._socket.close();
    }

    private onSocketMsg(msg: Buffer) {
        console.log(`Drone IO response: ${msg}`);
    }

    send(command: string) {
        this._socket.send(command);
    }
}
