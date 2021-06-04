const { DroneState } = require('./dist/drone-state');
const { DroneIO } = require('./dist/drone-io');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

/*
    Constants
 */
const DRONE_STATE_PORT = 8890;
const STREAM_PORT = 3001;
const HTTP_PORT = 3000;

/*
    1. Create drone objects.
        - droneIO - for sending command,
        - droneState - for getting drone state from UDP socket.
 */
const droneIO = new DroneIO();
const droneState = new DroneState(DRONE_STATE_PORT);
droneIO.send('command');

/*
    2. Create the web server for serve files.
*/
http.createServer((req, res) => {
    // Read file from the web folder and serve it to the user
    fs.readFile(`${__dirname}/src/web/${req.url}`, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(HTTP_PORT);

/*
    3. Create a web socket server and when the connection is established,
       listen to the drone state messages and send them to the socket.
*/
const wss = new WebSocket.Server({ port: STREAM_PORT });
wss.on('connection', (ws) =>
  droneState.getMessages().subscribe((msg) => ws.send(msg.toString()))
);
