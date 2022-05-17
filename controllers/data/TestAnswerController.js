const TestQuestion = require('../../models/TestQuestion')
const TestAnswer = require('../../models/TestAnswers')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const SuccessResponses = require("../../responses/SuccessResponses");
const mongoose = require("mongoose");

class TestAnswerController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return ErrorResponses.modelValidationError(res, ModelsElements.TEST_ANSWER, errors) }

            const {text, isTrue, testQuestionId, points} = req.body
            let newElem, idCandidate

            if(testQuestionId === "null") {
                newElem = new TestAnswer({text: text, points: points, isTrue: isTrue, testQuestionId: "null"})
                await newElem.save()
            }
            else {
                if(mongoose.Types.ObjectId.isValid(testQuestionId)) {
                    idCandidate = await TestQuestion.findById(testQuestionId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.TEST_QUESTION) }
                    newElem = new TestAnswer({text: text, points: points, isTrue: isTrue, testQuestionId: testQuestionId})
                    await newElem.save()
                }
                else return ErrorResponses.invalidId(res, ModelsElements.TEST_QUESTION)
            }
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

            const {text, isTrue, testQuestionId, points, id} = req.body

            if(testQuestionId === "null"){
                const updDoc = await TestAnswer.findByIdAndUpdate(id,
                    {
                        text: text,
                        points: points,
                        isTrue: isTrue,
                        testQuestionId: "null"
                    },
                    {new: true})
                if(updDoc)
                    return SuccessResponses.successElemOperation(res, ModelsElements.TEST_ANSWER, CRUD_OPERATIONS.UPDATED, updDoc)
            }
            else {
                if(mongoose.Types.ObjectId.isValid(testQuestionId)) {
                    const idCandidate = await TestQuestion.findById(testQuestionId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.TEST_QUESTION) }
                    const updDoc = await TestAnswer.findByIdAndUpdate(id,
                        {
                            text: text,
                            points: points,
                            isTrue: isTrue,
                            testQuestionId: testQuestionId
                        },
                        {new: true})
                    if(updDoc)
                        return SuccessResponses.successElemOperation(res, ModelsElements.TEST_ANSWER, CRUD_OPERATIONS.UPDATED, updDoc)
                }
                else return ErrorResponses.invalidId(res, ModelsElements.TEST_QUESTION)
            }
        }
        catch (e){
            console.log(e)
            return ErrorResponses.crudOperationError(res, ModelsElements.TEST_ANSWER, CRUD_OPERATIONS.UPDATING, e)
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