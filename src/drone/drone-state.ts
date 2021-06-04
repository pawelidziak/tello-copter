import { Observable, Subject } from 'rxjs';

import { UdpSocket } from './udp-socket';

export class DroneState {
    private _socket: UdpSocket;
    private _message$ = new Subject<Buffer>();

    constructor(port: number) {
        this._socket = new UdpSocket(port);
        this.addSocketEvents();
    }

    private addSocketEvents() {
        this._socket.addSocketListener('error', this.onSocketError.bind(this));
        this._socket.addSocketListener('message', this.onSocketSocketMsg.bind(this));
    }

    private onSocketError(err: Error) {
        console.log(`Drone State Error: ${err.message}`);
        this._socket.close();
    }

    private onSocketSocketMsg(msg: Buffer) {
        this._message$.next(msg);
    }

    getMessages(): Observable<Buffer> {
        return this._message$;
    }
}
