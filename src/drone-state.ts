import { UdpSocket } from './udp-socket';

const DRONE_STATE_PORT = 8890;
const STATE_HEADER = `
     ###################################
     ###                             ###
     ###      Tello COPTER State     ###
     ###                             ###
     ###################################
    `;

export class DroneState {
    private _socket: UdpSocket;

    constructor() {
        console.log(STATE_HEADER);
        this._socket = new UdpSocket(DRONE_STATE_PORT);
        this.addSocketEvents();
    }

    private addSocketEvents() {
        this._socket.addSocketListener('error', this.onSocketError.bind(this));
        this._socket.addSocketListener('message', this.onSocketSocketMsg.bind(this));
    }

    private onSocketError(err: Error) {
        console.log(`Error: ${err.message}`);
        this._socket.close();
    }

    private onSocketSocketMsg(msg: Buffer) {
        console.log(`State: ${msg}`);
    }
}

new DroneState();
