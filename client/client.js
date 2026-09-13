const { io } = require("socket.io-client") // We are importing "io" function + "io" is used to established a connection with "server"
const readline = require("readline") // Node.JS Built-in Module : It is used to take input from terminal of "user" : Provide a decent UI
const socket = io("http://localhost:5000") // "socket" - object ! Connected ( user / users ) request will be on this PORT "5000" + Socket.IO server will be runnnig on this PORT !

const r1 = readline.createInterface({
    // "input" comming from "keyboard" : priting "output" on "terminal" ✅
    input: process.stdin, // "stander-input"
    output: process.stdout // "stander-output"
}) // Create a "interace" through which we can handle the Input and Output from Terminal !

let username = "" // Initially it will "empty" . But the user will enter will the name from Terminal and it will be Stored here !

// "event" run when a client connects ~ "Execute Call Back"
socket.on("connect", () => {
    console.log("Connected To Chat Server")
    console.log("Socket ID : ", socket.id)


    r1.question("Enter You UserName : ", (name) => {
        username = name.trim()
        console.log(`You r now : ${username}`)
        console.log("Start Chatting !")

        promptMessage()
    })
})


// ~ Show It's Msg to Client A : So Client A can see it's MSG on it's Terminal !
socket.on("chat:message", (data) => {
    console.log(`${data.username}: ${data.message}`)
    promptMessage() // "Continue the Chatting : Ask for next Msg !"
})

// When Client - A Disconnets ! Run this "Event" ~
socket.on("disconnect", () => {
    console.log("Disconnected From Server")
    r1.close() // Close That Particular Client Chatting "Interface"
})


// Through This Function "user/client" can type MSG on Terminal !
function promptMessage() {
    r1.question(">", (message) => {
        if (!message.trim()) {
            promptMessage()
            return
      }
      // Send This MSG to the "server" !
        socket.emit("chat:message", { // #30
            username,
            message
        })
        // Ask for another MSG !
        promptMessage()
    })
}

/* promptMessage() -> User Type -> emit() */


/*

  Remember this "flow" !

        CLIENT
          │
          │ socket.emit("chat:message") # Client A can see it's MSG
          ▼
        SERVER
          │
          │ io.emit("chat:message") # All Connected Client BCDEF... can see Client A MSG's !
          ├──────────────┐
          ▼              ▼
          CLIENT A       CLIENT B



*/
