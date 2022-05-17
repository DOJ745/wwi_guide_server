const Router = require('express')
const router = new Router()
const ModelsElements = require("../models/models_elements")
const logController = require('../controllers/data/LogController')
const yearController = require('../controllers/data/YearController')
const countryController = require('../controllers/data/CountryController')
const rankController = require('../controllers/data/RankController')
const userController = require('../controllers/data/UserController')
const achievementController = require('../controllers/data/AchievementController')
const eventController = require('../controllers/data/EventController')
const armamentController = require('../controllers/data/ArmamentController')
const surveyController = require('../controllers/data/SurveyController')
const testThemeController = require('../controllers/data/TestThemeController')
const testQuestionController = require('../controllers/data/TestQuestionController')
const testAnswerController = require('../controllers/data/TestAnswerController')
const CheckFactory = require('../middleware/CheckHandlersFactory')
const roleMiddleware = require('../middleware/RoleMiddleware')

// ----- YEARS -----
router.get('/years', yearController.getElems)
/*router.post('/years',
    [CheckFactory.createIsIntNotEmpty('date', 1914, 1918),],
    yearController.addElem)*/
router.post('/years', yearController.addElem)
//router.put('/years', roleMiddleware(['ADMIN']), yearController.updateElem)
router.put('/years', yearController.updateElem)
//router.delete('/years', roleMiddleware(['ADMIN']), yearController.deleteElem)
router.delete('/years', (req, res) =>{
    yearController.deleteElem(req, res, ModelsElements.YEAR)
})

// ----- RANKS -----
router.get('/ranks', rankController.getElems)
//router.post('/ranks', roleMiddleware(['ADMIN']), rankController.addElem)
router.post('/ranks', rankController.addElem)
//router.put('/ranks', roleMiddleware(['ADMIN']), rankController.updateElem)
router.put('/ranks', rankController.updateElem)
//router.delete('/ranks', roleMiddleware(['ADMIN']), rankController.deleteElem)
router.delete('/ranks', (req, res) =>{
    rankController.deleteElem(req, res, ModelsElements.RANK)
})

// ----- COUNTRIES -----
router.get('/countries', countryController.getElems)
//router.post('/countries', roleMiddleware(['ADMIN']), countryController.addElem)
router.post('/countries', countryController.addElem)
//router.put('/countries', roleMiddleware(['ADMIN']), countryController.updateElem)
router.put('/countries', countryController.updateElem)
//router.delete('/countries', roleMiddleware(['ADMIN']), countryController.deleteElem)
router.delete('/countries', (req, res) =>{
    countryController.deleteElem(req, res, ModelsElements.COUNTRY)
})

// ----- USERS -----
router.get('/users', roleMiddleware(['ADMIN']), userController.getElems)
router.post('/users', roleMiddleware(['ADMIN']), userController.addElem)
router.put('/users', roleMiddleware(['ADMIN', 'USER']), userController.updateElem)
router.delete('/users', roleMiddleware(['ADMIN']), userController.deleteElem)

// ----- EVENTS -----
router.get('/events', eventController.getElems)
//router.post('/events', roleMiddleware(['ADMIN']), eventController.addElem)
router.post('/events', eventController.addElem)
router.put('/events', roleMiddleware(['ADMIN']), eventController.updateElem)
router.delete('/events', roleMiddleware(['ADMIN']), eventController.deleteElem)

// ----- ARMAMENT -----
router.get('/armament', armamentController.getElems)
//router.post('/armaments', roleMiddleware(['ADMIN']), armamentController.addElem)
router.post('/armament', armamentController.addElem)
router.put('/armament', roleMiddleware(['ADMIN']), armamentController.updateElem)
router.delete('/armament', roleMiddleware(['ADMIN']), armamentController.deleteElem)

// ----- ACHIEVEMENTS -----
router.get('/achievements', achievementController.getElems)
//router.post('/achievements', roleMiddleware(['ADMIN']), achievementController.addElem)
router.post('/achievements', achievementController.addElem)
//router.put('/achievements', roleMiddleware(['ADMIN']), achievementController.updateElem)
router.put('/achievements', achievementController.updateElem)
//router.delete('/achievements', roleMiddleware(['ADMIN']), achievementController.deleteElem)
router.delete('/achievements', (req, res) =>{
    achievementController.deleteElem(req, res, ModelsElements.ACHIEVEMENT)
})

// ----- SURVEYS -----
router.get('/surveys', surveyController.getElems)
//router.post('/surveys-answers', roleMiddleware(['ADMIN']), surveyController.addElem)
router.post('/surveys', surveyController.addElem)
router.put('/surveys', roleMiddleware(['ADMIN']), surveyController.updateElem)
router.delete('/surveys', roleMiddleware(['ADMIN']), surveyController.deleteElem)

// ----- TESTS THEMES -----
router.get('/tests-themes', testThemeController.getElems)
//router.post('/tests-themes', roleMiddleware(['ADMIN']), testThemeController.addElem)
router.post('/tests-themes', testThemeController.addElem)
//router.put('/tests-themes', roleMiddleware(['ADMIN']), testThemeController.updateElem)
router.put('/tests-themes', testThemeController.updateElem)
//router.delete('/tests-themes', roleMiddleware(['ADMIN']), testThemeController.deleteElem)
router.delete('/tests-themes', (req, res) => {
    testThemeController.deleteElem(req, res, ModelsElements.TEST_THEME)
})

// ----- TESTS QUESTIONS -----
router.get('/tests-questions', testQuestionController.getElems)
//router.post('/tests-questions', roleMiddleware(['ADMIN']), testQuestionController.addElem)
router.post('/tests-questions', testQuestionController.addElem)
//router.put('/tests-questions', roleMiddleware(['ADMIN']), testQuestionController.updateElem)
router.put('/tests-questions', testQuestionController.updateElem)
//router.delete('/tests-questions', roleMiddleware(['ADMIN']), testQuestionController.deleteElem)
router.delete('/tests-questions', (req, res) => {
    testQuestionController.deleteElem(req, res, ModelsElements.TEST_QUESTION)
})

// ----- TESTS ANSWERS -----
router.get('/tests-answers', testAnswerController.getElems)
//router.post('/tests-answers', roleMiddleware(['ADMIN']), testAnswerController.addElem)
router.post('/tests-answers', testAnswerController.addElem)
//router.put('/tests-answers', roleMiddleware(['ADMIN']), testAnswerController.updateElem)
router.put('/tests-answers', testAnswerController.updateElem)
router.delete('/tests-answers', roleMiddleware(['ADMIN']), testAnswerController.deleteElem)

// ----- LOGS -----
/*
router.get()
router.delete()*/
router.post('/logs', roleMiddleware(['USER']), logController.addElem)

module.exports = router