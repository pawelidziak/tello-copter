const ws = new WebSocket('ws://localhost:3001');
const stateEl = document.getElementById('drone-state');

ws.onmessage = (e) => stateEl.innerText = e.data;
