const express = require('express');
const cookieParser = require('cookie-parser'); // Ensure cookie-parser is required
const dotenv = require("dotenv");
const app = express()
const connectToMongo = require('./db');
const port = process.env.PORT || 5000;
const cors = require('cors');


dotenv.config();
app.use(cors())

app.use(express.json());
app.use(cookieParser()); 
// Available routes
const userRoute = require('./routes/userRoutes');
const taskRoute = require('./routes/taskRoutes');

app.use('/api/auth', userRoute);
app.use('/api/task', taskRoute);

app.listen(port, () => {
    connectToMongo();
    console.log("I am on iNoteBook project at the port: " + port);
})