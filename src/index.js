const express = require("express")
const bodyparser = require("body-parser")
const app = express()
require("../models/index.models.js")

// instead of this  use require("./models/index.js") to make it more dynamic
// const User = require("../models/user.models.js")
// const Contact = require("../models/contacts.models.js")

app.use(bodyparser.json())

app.get("/", (req, res) => {
    res.send("<h1>Hello Sequelize World!</h1>")
})


// instead of this 
// User.sync();
// Contact.sync();

// use await sequelize.sync() // use this in index file to make it more dynamic

app.listen(3000, () => {
    console.log("Example app listening on port 3000!")
})
