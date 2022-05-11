const TestQuestion = require('../../models/TestQuestion')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const TestTheme = require("../../models/TestTheme");
const SuccessResponses = require("../../responses/SuccessResponses");

class TestQuestionController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return ErrorResponses.modelValidationError(res, ModelsElements.TEST_QUESTION, errors) }

            const {text, img, testThemeId} = req.body

            const idCandidate = await TestTheme.findById(testThemeId)
            if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.TEST_THEME) }

            const newElem = new TestQuestion({text: text, img: img, testThemeId: testThemeId})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.TEST_QUESTION, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.TEST_QUESTION, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_QUESTION, errors)
            }
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_QUESTION, errors)
            }
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await TestQuestion.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/tests/tests-questions', {title: "Tests questions", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new TestQuestionController()