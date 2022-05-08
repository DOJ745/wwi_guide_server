const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/RoleMiddleware')
const AchievementController = require('../controllers/data/AchievementController')

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

/*router.get("/achievements", (req, res) => {
    res.render('data/achievements', {title: "Achievements", elements: AchievementController.getElems(req, res)})
})*/
router.get("/achievements", AchievementController.getElems)

router.get("/armament", (req, res) => {
    res.render('data/armament', {title: "Armament"})
})

router.get("/years", (req, res) => {
    res.render('data/years', {title: "Years"})
})

router.get("/events", (req, res) => {
    res.render('data/events', {title: "Events"})
})

router.get("/ranks", (req, res) => {
    res.render('data/ranks', {title: "Ranks"})
})

router.get("/countries", (req, res) => {
    res.render('data/countries', {title: "Countries"})
})

router.get("/tests-themess", (req, res) => {
    res.render('data/tests/tests-themes', {title: "Tests themes"})
})

router.get("/tests-answers", (req, res) => {
    res.render('data/tests/tests-answers', {title: "Tests answers"})
})

router.get("/tests-questions", (req, res) => {
    res.render('data/tests/tests-questions', {title: "Tests questions"})
})

router.get("/surveys-answers", (req, res) => {
    res.render('data/surveys/surveys-answers', {title: "Surveys answers"})
})

router.get("/surveys-questions", (req, res) => {
    res.render('data/surveys/surveys-questions', {title: "Surveys questions"})
})

router.get("/logs", (req, res) => {
    res.render('data/logs', {title: "Logs"})
})

router.get("/users", (req, res) => {
    res.render('data/users', {title: "Users"})
})

module.exports = router