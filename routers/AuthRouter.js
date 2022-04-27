const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')
const CheckFactory = require('../middleware/CheckHandlersFactory')

router.post('/reg', [
        CheckFactory.createLengthMinMaxNotEmpty('login', 4, 48),
        CheckFactory.createLengthMinMaxNotEmpty('password', 6, 18)], AuthController.reg)

router.post('/login',[
    CheckFactory.createLengthMinMaxNotEmpty('login', 4, 48),
    CheckFactory.createLengthMinMaxNotEmpty('password', 6, 18)], AuthController.login)

router.post('/reg-adm',[
        CheckFactory.createLengthMinMaxNotEmpty('login', 4, 48),
        CheckFactory.createLengthMinMaxNotEmpty('password', 6, 18)], AuthController.reg)

module.exports = router