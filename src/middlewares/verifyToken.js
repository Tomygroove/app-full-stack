const jwt = require('jsonwebtoken');
const config = require('../configs');

function verifyToken(req, res, next) {
    console.log(req.headers);
    let token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: "missing token, please login"
        })
    }

    jwt.verify(token, config.jwt.secret, (err) => {
        if (err) {
            return res.status(401).send({
                auth: false,
                message: "none autorized"
            })
        }
        next();
    })
}

module.exports = verifyToken;