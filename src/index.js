const express = require("express")
const bodyparser = require("body-parser")
const app = express()
require("../models/index.models.js")
const userController = require("../controller/user.controller.js")

// instead of this  use require("./models/index.js") to make it more dynamic
// const User = require("../models/user.models.js")
// const Contact = require("../models/contacts.models.js")

app.use(bodyparser.json())

app.get("/", (req, res) => {
    res.send("<h1>Hello Sequelize World!</h1>")
})


app.post("/addUser", userController.addUser)

app.get("/viewUsers", userController.viewUsers)

app.get("/getOneUser/:id", userController.getOneUser)

app.delete("/deleteUser/:id", userController.deleteUser)

app.put("/updateUser/:id", userController.updateUser)

app.get("/queryMethods", userController.queryMethods)


// instead of this 
// User.sync();
// Contact.sync();

// use await sequelize.sync() // use this in index file to make it more dynamic

app.listen(3000, () => {
    console.log("Example app listening on port 3000!")
})
