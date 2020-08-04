var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {

    usersController.list().then(
        (result) => {
            res.json(result);
        },
        (error) => {
            res.status(error.status).json({
                "success": error.success,
                "message": error.message
            })
        }
    )
});

router.post('/', function(req, res, next) {
    const { user, password } = req.body;

    usersController.create(user, password).then(
        (result) => {
            res.json(result);
        },
        (error) => {
            res.status(error.status).json({
                "success": error.success,
                "message": error.message
            })
        }
    )
});

module.exports = router;