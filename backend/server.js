const express = require('express');
const mongoose = require('mongoose');

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
const projectRoute = require('./routes/projectRoutes');

app.use('/api/auth', userRoute);
app.use('/api/task', taskRoute);
app.use('/api/project', projectRoute);

app.listen(port, () => {
    connectToMongo();


// MongoDB Connection
// mongoose.connect(process.env.DB_URL).then(() => {
//     console.log('MongoDB connected');

//     // List existing indexes on the tasks collection
//     mongoose.connection.collection('tasks').getIndexes((err, indexes) => {
//         if (err) {
//             console.error('Error fetching indexes:', err);
//         } else {
//             console.log('Current indexes on tasks collection:', indexes);
//         }

//         mongoose.connection.collection('tasks').dropIndex('employeeid_1', (err, result) => {
//             if (err) {
//                 console.error('Error dropping index:', err);
//             } else {
//                 console.log('Index dropped:', result);
//             }
//         });
        
//     });
// }).catch(err => {
//     console.error('MongoDB connection error:', err);
// });

    
    console.log("I am on iNoteBook project at the port: " + port);
})