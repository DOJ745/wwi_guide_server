const ModelsElements = require("../../models/models_elements")
const TestTheme = require('../../models/TestTheme')
const ErrorResponses = require("../../responses/ErrorResponses")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const Achievement = require("../../models/Achievement");
const SuccessResponses = require("../../responses/SuccessResponses");

class TestThemeController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return ErrorResponses.modelValidationError(res, ModelsElements.TEST_THEME, errors) }
            const {name, achievementId} = req.body

            const candidate = await TestTheme.findOne({name})
            const idCandidate = await Achievement.findById(achievementId)

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.TEST_THEME) }
            if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.ACHIEVEMENT) }

            const newElem = new TestTheme({name: name, achievementId: achievementId})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.TEST_THEME, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.TEST_THEME, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_THEME, errors)
            }
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_THEME, errors)
            }
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await TestTheme.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/tests/tests-themes', {title: "Tests themes", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new TestThemeController()