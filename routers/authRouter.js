const Router = require('express')
const router = new Router()
const authController = require('../controllers/AuthController')
const { check } = require('express-validator')

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

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
    authController.reg)

router.post('/login', authController.login)
router.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)

module.exports = router