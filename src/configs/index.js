const dbConfig = require('./dbConfig');
const serverConfig = require('./serverConfig');
const jwtConfig = require('./jwtConfig');

exports.database = dbConfig;
exports.server = serverConfig;
exports.jwt = jwtConfig;