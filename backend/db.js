const mongoose = require('mongoose');
const url = "mongodb+srv://sureshsarkar2020:YA2Nj0Wu4YpxltwG@cluster0.wx3zupi.mongodb.net/crm-system";

const connectToMongo = () => {

    const mongoose = require('mongoose');
    const mongoURL = process.env.DB_URL;// 'mongodb://127.0.0.1:27017/learnwiths2';
    mongoose.connect(mongoURL);
}

module.exports = connectToMongo;
