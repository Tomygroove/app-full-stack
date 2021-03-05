require('dotenv/config');
const app = require("./services/serverService")
const mongooseService = require('./services/mongooseService');

mongooseService.dbConnect();
app.start();