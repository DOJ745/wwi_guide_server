const Survey = require('../../models/Survey')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");
const User = require("../../models/User");

class SurveyController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.SURVEY, errors)
            }

            const {question_text, img, points, answer_variants} = req.body

            const newElem = new Survey({
                question_text: question_text,
                img: img,
                points: points,
                answer_variants: answer_variants
            })
            await newElem.save()
            return SuccessResponses.successElemOperation(res, ModelsElements.SURVEY, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.SURVEY, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.SURVEY, errors)
            }

            const {question_text, img, points, answer_variants, id} = req.body

            const updDoc = await Survey.findByIdAndUpdate(id,
                {
                    question_text: question_text,
                    img: img,
                    points: points,
                    answer_variants: answer_variants
                },
                {new: true})
            if(updDoc)
                return SuccessResponses.successElemOperation(res, ModelsElements.SURVEY, CRUD_OPERATIONS.UPDATED, updDoc)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.SURVEY, CRUD_OPERATIONS.UPDATING, e)
        }
    }


    async getElems(req, res) {
        try {
            const elems = await Survey.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/surveys', {title: "Surveys", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}
module.exports = new SurveyController()