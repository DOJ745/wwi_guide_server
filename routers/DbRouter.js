const Router = require('express')
const router = new Router()

const yearController = require('../controllers/data/YearController')
const countryController = require('../controllers/data/CountryController')
const rankController = require('../controllers/data/RankController')
const userController = require('../controllers/data/UserController')
const achievementController = require('../controllers/data/AchievementController')
const eventController = require('../controllers/data/EventController')
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
router.put('/users', roleMiddleware(['ADMIN']), userController.updateElem)
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

// ----- SURVEYS QUESTIONS -----
// ----- TESTS QUESTIONS -----
// ----- SURVEYS ANSWERS -----
// ----- TESTS ANSWERS -----
// ----- LOGS -----

module.exports = router