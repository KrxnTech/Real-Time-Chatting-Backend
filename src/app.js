const express = require('express');
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())

app.get("/api/health", (req, res) => {
    try {
        res.status(200).json({
            status: "Ok",
            message: "Chat Server Is Running Fine ( 200 )"
        })
    } catch (error) {
        // res.send(error.message)
        res.status(400).json({
            status: error.status,
            message: error.message || "Some Wrong From Backend Side"
        })
    }
})

module.exports = app