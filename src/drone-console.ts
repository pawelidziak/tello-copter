import { createInterface } from 'readline';
import { DroneIO } from './drone-io';

const CONSOLE_HEADER = `
     ###################################
     ###                             ###
     ###     Tello COPTER Console    ###
     ###                             ###
     ###################################
    `;

export class DroneConsole {
    private _rl = createInterface(process.stdin, process.stdout);
    private _drone = new DroneIO();

    constructor() {
        console.log(CONSOLE_HEADER);
        this._rl.on('line', this.onReadLine.bind(this)).on('close', this.onClose);
    }

    private onReadLine(input: string) {
        const command = input.trim();
        command === 'quit' ? this._rl.close() : this._drone.send(command);
    }

    private onClose() {
        console.log('Enough flying for today!');
        process.exit(0);
    }
}
