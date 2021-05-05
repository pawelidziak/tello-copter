import { createSocket, Socket, SocketOptions } from 'dgram';

const DEFAULT_SOCKET_OPTIONS: SocketOptions = {
    type: 'udp4',
};

export class UdpSocket {
    private _socket: Socket;
    private _host: string;
    private _port: number;

    constructor(port: number, host?: string, options?: SocketOptions) {
        this._host = host;
        this._port = port;
        this._socket = createSocket(options || DEFAULT_SOCKET_OPTIONS);
        this._socket.bind(this._port);
    }

    private onSendError(err: Error | null) {
        if (!err) {
            return;
        }
        console.error(`Socket send error: ${err}`);
        this._socket.close();
    }

    addSocketListener(event: string, callback: (any) => any) {
        this._socket.addListener(event, callback);
    }

    close() {
        this._socket.close();
    }

    send(command: string) {
        this._socket.send(
            command,
            0,
            command.length,
            this._port,
            this._host,
            this.onSendError.bind(this)
        );
    }
}
