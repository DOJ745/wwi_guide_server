const Router = require('express')
const router = new Router()

const logController = require('../controllers/data/LogController')
const yearController = require('../controllers/data/YearController')
const countryController = require('../controllers/data/CountryController')
const rankController = require('../controllers/data/RankController')
const userController = require('../controllers/data/UserController')
const achievementController = require('../controllers/data/AchievementController')
const eventController = require('../controllers/data/EventController')
const surveyQuestionController = require('../controllers/data/SurveyQuestionController')
const surveyAnswerController = require('../controllers/data/SurveyAnswerController')
const testThemeController = require('../controllers/data/TestThemeController')
const testQuestionController = require('../controllers/data/TestQuestionController')
const testAnswerController = require('../controllers/data/TestAnswerController')
const CheckFactory = require('../middleware/CheckHandlersFactory')
const roleMiddleware = require('../middleware/RoleMiddleware')

// ----- YEARS -----
router.get('/years', yearController.getElems)
router.post('/years',
    [CheckFactory.createIsIntNotEmpty('date', 1914, 1918),],
    yearController.addElem)

router.put('/years', roleMiddleware(['ADMIN']), yearController.updateElem)
router.delete('/years', roleMiddleware(['ADMIN']), yearController.deleteElem)

// ----- RANKS -----
router.get('/ranks', rankController.getElems)
router.post('/ranks', roleMiddleware(['ADMIN']), rankController.addElem)
router.put('/ranks', roleMiddleware(['ADMIN']), rankController.updateElem)
router.delete('/ranks', roleMiddleware(['ADMIN']), rankController.deleteElem)

// ----- COUNTRIES -----
router.get('/countries', countryController.getElems)
router.post('/countries', roleMiddleware(['ADMIN']), countryController.addElem)
router.put('/countries', roleMiddleware(['ADMIN']), countryController.updateElem)
router.delete('/countries', roleMiddleware(['ADMIN']), countryController.deleteElem)

// ----- USERS -----
router.get('/users', roleMiddleware(['ADMIN']), userController.getElems)
router.post('/users', roleMiddleware(['ADMIN']), userController.addElem)
router.put('/users', roleMiddleware(['ADMIN', 'USER']), userController.updateElem)
router.delete('/users', roleMiddleware(['ADMIN']), userController.deleteElem)

// ----- EVENTS -----
router.get('/events', eventController.getElems)
router.post('/events', roleMiddleware(['ADMIN']), eventController.addElem)
router.put('/events', roleMiddleware(['ADMIN']), eventController.updateElem)
router.delete('/events', roleMiddleware(['ADMIN']), eventController.deleteElem)

// ----- ACHIEVEMENTS -----
router.get('/achievements', achievementController.getElems)
//router.post('/achievements', roleMiddleware(['ADMIN']), achievementController.addElem)
router.post('/achievements', achievementController.addElem)
//router.put('/achievements', roleMiddleware(['ADMIN']), achievementController.updateElem)
router.put('/achievements', achievementController.updateElem)
//router.delete('/achievements', roleMiddleware(['ADMIN']), achievementController.deleteElem)
router.delete('/achievements', achievementController.deleteElem)

// ----- SURVEYS ANSWERS -----
router.get('/surveys-answers', surveyAnswerController.getElems)
router.post('/surveys-answers', roleMiddleware(['ADMIN']), surveyAnswerController.addElem)
router.put('/surveys-answers', roleMiddleware(['ADMIN']), surveyAnswerController.updateElem)
router.delete('/surveys-answers', roleMiddleware(['ADMIN']), surveyAnswerController.deleteElem)

// ----- SURVEYS QUESTIONS -----
router.get('/surveys-questions', surveyQuestionController.getElems)
router.post('/surveys-questions', roleMiddleware(['ADMIN']), surveyQuestionController.addElem)
router.put('/surveys-questions', roleMiddleware(['ADMIN']), surveyQuestionController.updateElem)
router.delete('/surveys-questions', roleMiddleware(['ADMIN']), surveyQuestionController.deleteElem)

// ----- TESTS THEMES -----
router.get('/tests-themes', testThemeController.getElems)
//router.post('/tests-themes', roleMiddleware(['ADMIN']), testThemeController.addElem)
router.post('/tests-themes', testThemeController.addElem)
router.put('/tests-themes', roleMiddleware(['ADMIN']), testThemeController.updateElem)
router.delete('/tests-themes', roleMiddleware(['ADMIN']), testThemeController.deleteElem)

// ----- TESTS QUESTIONS -----
router.get('/tests-questions', testQuestionController.getElems)
//router.post('/tests-questions', roleMiddleware(['ADMIN']), testQuestionController.addElem)
router.post('/tests-questions', testQuestionController.addElem)
router.put('/tests-questions', roleMiddleware(['ADMIN']), testQuestionController.updateElem)
router.delete('/tests-questions', roleMiddleware(['ADMIN']), testQuestionController.deleteElem)

// ----- TESTS ANSWERS -----
router.get('/tests-answers', testAnswerController.getElems)
//router.post('/tests-answers', roleMiddleware(['ADMIN']), testAnswerController.addElem)
router.post('/tests-answers', testAnswerController.addElem)
router.put('/tests-answers', roleMiddleware(['ADMIN']), testAnswerController.updateElem)
router.delete('/tests-answers', roleMiddleware(['ADMIN']), testAnswerController.deleteElem)

// ----- LOGS -----
/*
router.get()
router.delete()*/

router.post('/logs', roleMiddleware(['USER']), logController.addElem)

module.exports = router