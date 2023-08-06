const mongoose = require("mongoose");
const app = require("./app.js");

require('dotenv').config();

let server;
const  port= process.env.PORT;
const url = process.env.URL
console.log(port);

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port

mongoose 
.connect(url)
.then(() => {
    console.log("Connected to database")
    server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})
.catch((err) => console.log(err));