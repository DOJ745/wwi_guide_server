const TestQuestion = require('../../models/TestQuestion')
const TestAnswer = require('../../models/TestAnswers')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
require("../../models/TestTheme");
const SuccessResponses = require("../../responses/SuccessResponses");

class TestAnswerController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return ErrorResponses.modelValidationError(res, ModelsElements.TEST_ANSWER, errors) }

            const {text, isTrue, testQuestionId, points} = req.body

            const idCandidate = await TestQuestion.findById(testQuestionId)
            if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.TEST_QUESTION) }

            const newElem = new TestAnswer({text: text, isTrue: isTrue, testQuestionId: testQuestionId, points: points})
            await newElem.save()

            return SuccessResponses.successElemOperation(res, ModelsElements.TEST_ANSWER, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.TEST_ANSWER, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_ANSWER, errors)
            }
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_ANSWER, errors)
            }
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await TestAnswer.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/tests/tests-answers', {title: "Tests answers", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new TestAnswerController()