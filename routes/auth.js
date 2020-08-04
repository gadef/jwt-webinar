var express = require('express');
var router = express.Router();
const authController = require('../controllers/authController');


/* GET users listing. */
router.post('/login', function(req, res, next) {
    const { user, password } = req.body;
    authController.login(user, password).then(
        (result) => {
            res.cookie('rftk', result.refreshToken, {
                secure: false, // set to true if your using https
                httpOnly: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            })
            refreshTokens.push(result.refreshToken);
            delete result.refreshToken
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

router.delete('/logout', function(req, res, next) {
    console.log(refreshTokens);
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.rftk)
    console.log(refreshTokens);
    res.cookie('rftk', '', {
        secure: false, // set to true if your using https
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.sendStatus(204)
});

module.exports = router;