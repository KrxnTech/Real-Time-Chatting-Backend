const app = require("./app")
require("dotenv").config();
const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log("Server is Running Ok ( Fine )")
})