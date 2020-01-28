// 4. imports always go first - if we're importing anything

const socket = io();

function setUserId(packet) {
    debugger;
    console.log(packet);
}

// 9.
function runDisconnectMessage(packet) {
    debugger;
    console.log(packet);
}


// 6. some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);

// 8.
socket.addEventListener('user_disconnect', runDisconnectMessage);