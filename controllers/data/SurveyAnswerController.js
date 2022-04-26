const SurveyQuestion = require('../../models/SurveyQuestion')
const SurveyAnswer = require('../../models/SurveyAnswer')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");

class SurveyAnswerController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.SURVEY_ANSWER, errors)
            }
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.SURVEY_ANSWER, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.SURVEY_ANSWER, errors)
            }
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.SURVEY_ANSWER, errors)
            }
        }
        catch (e){

        }
    }

    async getElems(req, res) {
        try {
            const elems = await SurveyAnswer.find()
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new SurveyAnswerController()