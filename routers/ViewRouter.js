const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/RoleMiddleware')
const AchievementController = require('../controllers/data/AchievementController')
const TestThemeController = require('../controllers/data/TestThemeController')
const CountryController = require('../controllers/data/CountryController')
const RankController = require('../controllers/data/RankController')
const YearController = require('../controllers/data/YearController')
const LogController = require('../controllers/data/LogController')
const TestQuestionController = require('../controllers/data/TestQuestionController')
const TestAnswerController = require('../controllers/data/TestAnswerController')
const SurveyController = require('../controllers/data/SurveyController')
const UserController = require('../controllers/data/UserController')
const ArmamentController = require('../controllers/data/ArmamentController')
const EventController = require('../controllers/data/EventController')

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

router.get("/achievements", AchievementController.getElems)
router.get("/armament", ArmamentController.getElems)
router.get("/years", YearController.getElems)
router.get("/events", EventController.getElems)
router.get("/ranks", RankController.getElems)
router.get("/countries", CountryController.getElems)
router.get("/tests-themes", TestThemeController.getElems)
router.get("/tests-answers", TestAnswerController.getElems)
router.get("/tests-questions", TestQuestionController.getElems)
router.get("/surveys", SurveyController.getElems)
router.get("/logs", LogController.getElems)
router.get("/users", UserController.getElems)

module.exports = router