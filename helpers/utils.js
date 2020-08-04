const jwt = require('jsonwebtoken');

const utils = {
    generateAccessToken(data) {
        const payload = data;
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: '10s' };
        const token = jwt.sign(payload, secret, options);
        return token;
    },

    validateToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(data)
                }
            })
        })

    },
    generateRefreshToken(data) {

        const payload = data;
        const secret = process.env.JWT_REFRESH;
        const options = { expiresIn: '3d' };
        const rtoken = jwt.sign(payload, secret, options);
        return rtoken;
    },

    validateRefreshToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_REFRESH, (err, data) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(data)
                }
            })
        })

    },

    authenticateToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401)
        console.log(token);

        utils.validateToken(token).then(
            (result) => {
                next();
            },
            (err) => {
                return res.sendStatus(401)
            });
    }
}
module.exports = utils;