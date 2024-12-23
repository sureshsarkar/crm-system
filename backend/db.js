const mongoose = require('mongoose');

const connectToMongo = () => {

    const mongoose = require('mongoose');
    const mongoURL = process.env.DB_URL;// 'mongodb://127.0.0.1:27017/learnwiths2';
    mongoose.connect(mongoURL);
    console.log("DB Connected");

}
module.exports = connectToMongo;
