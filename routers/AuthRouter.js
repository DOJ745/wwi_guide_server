const Router = require('express')
const router = new Router()
const authController = require('../controllers/AuthController')
const CheckFactory = require('../middleware/CheckHandlersFactory')

router.post('/reg', [
        CheckFactory.createLengthMinMaxNotEmpty('login', 4, 48),
        CheckFactory.createLengthMinMaxNotEmpty('password', 6, 18)], authController.reg)

router.post('/login',[
    CheckFactory.createLengthMinMaxNotEmpty('login', 4, 48),
    CheckFactory.createLengthMinMaxNotEmpty('password', 6, 18)], authController.login)

router.post('/reg-adm',[
        CheckFactory.createLengthMinMaxNotEmpty('login', 4, 48),
        CheckFactory.createLengthMinMaxNotEmpty('password', 6, 18)], authController.reg)

module.exports = router