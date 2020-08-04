const usersModel = require('../models/usersModel');

class usersController {
    list() {

        return new Promise((resolve, reject) => {
            let result = {};
            let status = 200;
            usersModel.find({}, { password: 0 }).then(
                (data) => {
                    result = data;
                    result.success = true;
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

    create(user, password) {

        return new Promise((resolve, reject) => {
            let result = {};
            let status = 200;
            usersModel.create({ user, password }).then(
                (data) => {
                    result = data;
                    result.success = true;
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

}

module.exports = new usersController;