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
router.get("/home", roleMiddleware(['ADMIN']), (req, res) => {
    res.render('home', {title: "Home"})
})

router.get("/achievements", roleMiddleware(['ADMIN']), AchievementController.getElems)
router.get("/armament", roleMiddleware(['ADMIN']), ArmamentController.getElems)
router.get("/years", roleMiddleware(['ADMIN']), YearController.getElems)
router.get("/events", roleMiddleware(['ADMIN']), EventController.getElems)
router.get("/ranks", roleMiddleware(['ADMIN']), RankController.getElems)
router.get("/countries", roleMiddleware(['ADMIN']), CountryController.getElems)
router.get("/tests-themes", roleMiddleware(['ADMIN']), TestThemeController.getElems)
router.get("/tests-answers", roleMiddleware(['ADMIN']), TestAnswerController.getElems)
router.get("/tests-questions", roleMiddleware(['ADMIN']), TestQuestionController.getElems)
router.get("/surveys", roleMiddleware(['ADMIN']), SurveyController.getElems)
router.get("/logs", roleMiddleware(['ADMIN']), LogController.getElems)
router.get("/users", roleMiddleware(['ADMIN']), UserController.getElems)

module.exports = router