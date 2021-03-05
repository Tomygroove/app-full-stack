require('dotenv/config');
const app = require("./src/services/serverService")
const mongooseService = require('./src/services/mongooseService');

mongooseService.dbConnect();
app.start();