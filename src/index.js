const express = require("express")
const bodyparser = require("body-parser")
const app = express()
require('../models/index.models.js')

app.use(bodyparser.json())

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(3000, () => {
    console.log("Example app listening on port 3000!")
})
