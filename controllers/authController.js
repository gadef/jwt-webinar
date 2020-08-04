const usersModel = require('../models/usersModel');

class authController {

    login(user, password) {

        return new Promise((resolve, reject) => {
            let info = {};
            let result = {};
            let status = 200;
            usersModel.findOne({ user, password }, {}).then(
                (data) => {
                    if (!data) {
                        result.status = 401;
                        result.success = false;
                        result.message = 'Authentication failed';
                        return reject(result);
                    }

                    info.id = data._id;
                    info.user = data.user;
                    const token = utils.generateAccessToken(info);
                    const rtoken = utils.generateRefreshToken(info);
                    result.success = true;
                    result.token = token;
                    result.refreshToken = rtoken;
                    resolve(result);
                },
                (error) => {
                    result.status = 404;
                    result.success = false;
                    result.message = error;
                    reject(result)
                }
            );
        });

    }

    refresh(data) {

        return new Promise((resolve, reject) => {
            let info = {};
            let result = {};
            let status = 200;

            info.id = data._id;
            info.user = data.user;
            const token = utils.generateAccessToken(info);
            const rtoken = utils.generateRefreshToken(info);
            result.success = true;
            result.token = token;
            result.refreshToken = rtoken;
            resolve(result);
        });

    }

    logoutUsers() {

    }




}

module.exports = new authController;