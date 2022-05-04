const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/RoleMiddleware')

router.get("test-page",
    (req, res) => {
    res.render('test')
})
router.get("/", (req, res) => {
    if(req.cookies.access_token)
        res.redirect('/home')
    else res.render('auth/log_in', {title: "Log in"})
})
router.get("/reg", (req, res) => {
    res.render('auth/sign_up', {title: "Sign up"})
})
//router.get("/home", roleMiddleware(['ADMIN']), (req, res) => {
router.get("/home", (req, res) => {
    res.render('home', {title: "Home"})
})

module.exports = router