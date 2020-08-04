var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');

router.post('/', function(req, res, next) {

    const rToken = req.cookies.rftk || '';
    if (!rToken) return res.sendStatus(401)
    console.log(rToken);
    utils.validateRefreshToken(rToken).then(
        (data) => {
            authController.refresh(data).then(
                (result) => {
                    res.cookie('rftk', result.refreshToken, {
                        secure: false, // set to true if your using https
                        httpOnly: true,
                        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                    })
                    console.log(refreshTokens + " 1");
                    refreshTokens.push(result.refreshToken);
                    delete result.refreshToken
                    refreshTokens = refreshTokens.filter(token => token !== rToken)
                    console.log(refreshTokens + " 2");
                    res.json(result);
                },
                (error) => {
                    res.status(error.status).json({
                        "success": error.success,
                        "message": error.message
                    })
                }
            )
        },
        (err) => {
            res.sendStatus(401);
        });

});

module.exports = router;