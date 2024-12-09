const express = require('express');
const dotenv = require("dotenv");
const app = express()
const connectToMongo = require('./Db');
const port = process.env.PORT || 5000;


const cors = require('cors');
dotenv.config();
app.use(cors())

app.use(express.json());
// Available routes

// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/notes'));
app.listen(port, () => {
    connectToMongo();
    console.log("I am on iNoteBook project at the port: " + port);
})