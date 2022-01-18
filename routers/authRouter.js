const Router = require('express')
const router = new Router()
const controller = require('../controllers/AuthController')
const { check } = require('express-validator')

router.post(
    '/reg',
    [
        check('login',
            'Login cannot be empty and is length must be between 4 and 48 symbols!')
            .notEmpty()
            .isLength({min: 4, max: 48 }),
        check('password', 'Password cannot be empty and and is length must be between 4 and 12 symbols!')
            .notEmpty()
            .isLength({min: 4, max: 12})
    ],
    controller.reg)

router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router