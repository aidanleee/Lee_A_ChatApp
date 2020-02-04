var express = require('express');
var app = express();

// 1. import the socket modules 
const io = require('socket.io')(); // instantiate the socket.io library right away with the () method

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// this is all of our socket.io messaging functionality

// 2. attach socket.io
io.attach(server);

io.on('connection', function(socket) {
    console.log("user connected");
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'}); // 5.

    // 17. listen for incoming message from a user (socket refers to an individual user)
    // msg is the incoming message from that user
    socket.on('chat_message', function(msg) {
        console.log(msg);

        // when we get a new message, send it to everyone so they see it
        // io is the switchboard operator, making sure everyone whos connected
        // gets the messages
        io.emit('new_message', { id: socket.id, message: msg })
    })

    // 3. listen for a disconect event
    socket.on('disconnect', function() {
        console.log('a user disconnected');

        // 7.
        message = `${socket.id} has left the chat!`;
        io.emit('user_disconnect', message);
    })
})