// 12. imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

// 4.
const socket = io();

function setUserId({sID, message}) {
    //debugger;
    vm.socketID = sID;
}

// 9.
function runDisconnectMessage(packet) {
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    // take incoming messages and push it into the Vue instance
    vm.messages.push(msg);
}

// 11. this is our main Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },

    // 15.
    methods: {
        dispatchMessage() {
            // emit a message event and send the message to the server
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "anonymous"
                // || is called a double pipe operator "or" generator
                // if this.nickName is set, use it as the value
                // or just make name "anonymous"
            })
            this.message = ""; // 18.
        }
    },

    // 13.
    components: {
         newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount(`#app`);


// 6. some event handling -> these events are coming from the server
socket.addEventListener('connected', setUserId);

// 8.
socket.addEventListener('user_disconnect', runDisconnectMessage);

// 18.
socket.addEventListener('new_message', appendNewMessage);