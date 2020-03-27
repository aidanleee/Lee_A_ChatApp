import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

function setUserId({sID, message}) {
    //debugger;
    console.log(sID, message);
    vm.socketID = sID;
}

function runDisconnectMessage(packet) {
    //debugger;
    console.log(packet);
}

function appendNewMessage(msg) {
    vm.messages.push(msg);
}

const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },

    methods: {
        dispatchMessage() {
            console.log('handle send message');

            socket.emit('chat_message', {
                content: this.message,
                name: this.nickName || "Anonymous"
                // || is called a double pipe operator "or" generator
                // if this.nickName is set, use it as the value
                // or just make name "anonymous"
            })
            // reset the message field
            this.message = "";
        },

        closeUsername() {
            document.getElementById("username").classList.add("hide")
        }
    },

    components: {
         newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
}).$mount(`#app`);


socket.addEventListener('connected', setUserId);
socket.addEventListener('user_disconnect', runDisconnectMessage);
socket.addEventListener('new_message', appendNewMessage);