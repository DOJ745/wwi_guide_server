const TestQuestion = require('../../models/TestQuestion')
const TestAnswer = require('../../models/TestAnswers')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");

class TestAnswerController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.TEST_ANSWER, errors)
            }
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
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new TestAnswerController()