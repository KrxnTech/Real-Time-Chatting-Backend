require("dotenv").config(); // Loading Dotenv !

const http = require("http") // It is used to creat "HTTP" server ! + Socket.IO Connection !
const app = require("./app")
const { Server } = require("socket.io") // Importing server class of Socket.IO + Using this we can create "real-time Socket.IO" server !

const PORT = process.env.PORT || 5000
const server = http.createServer(app) // "HTTP" server is created !

const io = new Server(server, { cors: { origin: "*" } }) // Connection ! Socket.IO server Created


io.on("connection", (socket) => { // Server is listening any Socket.IO event + When any client connects with Socket.IO server !
    console.log(`Client Connected ${socket.id}`)

    /*  ✅ Server will send this "event" to that particular user !
    socket.emit("welcome", {
        message: "Connected To Chat Server",
        socketId: socket.id
    })
    */


    // Client Reveice this !
    // Client A : Current Connected Client !
    socket.on("chat:message", (data) => {
        console.log(`${data.username} : ${data.message}`)

        // Client B : Current Chatting Client - BroadCast Msg ~
        io.emit("chat:message", {
            username: data.username,
            message: data.message
        })
    })




    socket.on("disconnect", () => {
        console.log(`Client Disconnect ${socket.id}`)
    })
})

server.listen(PORT, (req, res) => {
    console.log("Server is Running Ok ( Fine )")
})
