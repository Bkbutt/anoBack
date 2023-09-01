const mongoose = require('mongoose');
function DbConnect() {
    console.log('coming here...', "mongodb+srv://Jimmy:50623@cluster0.ybvimf6.mongodb.net/?retryWrites=true&w=majority");
    const DB_URL = "mongodb+srv://Jimmy:50623@cluster0.ybvimf6.mongodb.net/?retryWrites=true&w=majority"
    // mongodb+srv://sherazzafar148:sam36520@cluster0.1yekrwb.mongodb.net/
    // Database connection mongodb://localhost:27017
    mongoose.connect("mongodb://localhost:27017/anob", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: true,
    });
    // mongoose.connect("connected")
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('DB connected...');
    });
}

module.exports = DbConnect;