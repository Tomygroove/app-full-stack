const mongoose = require('mongoose');
const config = require('../configs');
const url = config.database.url;

exports.dbConnect = () => {
    mongoose.connect(url, {
        useNewParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then (() => {
        console.log("successfully connected to the database")
    })
    .catch(err => {
        console.log("couldn't connect to the database", err);
        process.exit();
    })
}

