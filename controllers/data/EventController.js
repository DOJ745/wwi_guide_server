const Event = require('../../models/Event')
const Year = require('../../models/Year')
const Survey = require('../../models/Survey')
const ErrorResponses = require("../../responses/ErrorResponses")
const SuccessResponses = require("../../responses/SuccessResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const Achievement = require("../../models/Achievement");
const mongoose = require("mongoose");

class EventController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.EVENT, errors)
            }

            const currentDoc = req.body
            let idCandidate, allValid = false

            if(currentDoc.yearId === "null") {
                currentDoc.yearId = "null"
                allValid = true
            }
            else {
                if(mongoose.Types.ObjectId.isValid(currentDoc.yearId)) {
                    idCandidate = await Year.findById(currentDoc.yearId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.YEAR) }
                    else currentDoc.yearId = idCandidate._id
                    allValid = true
                }
                else return ErrorResponses.invalidId(res, ModelsElements.YEAR)
            }

            if(currentDoc.achievementId === "null"){
                currentDoc.achievementId = "null"
                allValid = true
            }
            else {
                if(mongoose.Types.ObjectId.isValid(currentDoc.achievementId)) {
                    idCandidate = await Achievement.findById(currentDoc.achievementId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.ACHIEVEMENT) }
                    else currentDoc.achievementId = idCandidate._id
                    allValid = true
                }
                else return ErrorResponses.invalidId(res, ModelsElements.ACHIEVEMENT)
            }

            if(currentDoc.surveyId === "null"){
                currentDoc.surveyId = "null"
                allValid = true
            }
            else {
                if(mongoose.Types.ObjectId.isValid(currentDoc.surveyId)) {
                    idCandidate = await Survey.findById(currentDoc.surveyId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.SURVEY) }
                    else currentDoc.surveyId = idCandidate._id
                    allValid = true
                }
                else return ErrorResponses.invalidId(res, ModelsElements.SURVEY)
            }

            if(allValid) {
                const newElem = new Event({
                    title: currentDoc.title,
                    text_paragraphs: currentDoc.text_paragraphs,
                    images: currentDoc.images,
                    images_titles: currentDoc.images_titles,
                    yearId: currentDoc.yearId,
                    achievementId: currentDoc.achievementId,
                    surveyId: currentDoc.surveyId
                })
                await newElem.save()
                return SuccessResponses.successElemOperation(res, ModelsElements.EVENT, CRUD_OPERATIONS.ADDED, null)
            }
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.EVENT, CRUD_OPERATIONS.ADDING, e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.EVENT, errors)
            }

            const currentDoc = req.body
            let idCandidate, allValid = false

            if(currentDoc.yearId === "null") {
                currentDoc.yearId = "null"
                allValid = true
            }
            else {
                if(mongoose.Types.ObjectId.isValid(currentDoc.yearId)) {
                    idCandidate = await Year.findById(currentDoc.yearId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.YEAR) }
                    else currentDoc.yearId = idCandidate._id
                    allValid = true
                }
                else return ErrorResponses.invalidId(res, ModelsElements.YEAR)
            }

            if(currentDoc.achievementId === "null"){
                currentDoc.achievementId = "null"
                allValid = true
            }
            else {
                if(mongoose.Types.ObjectId.isValid(currentDoc.achievementId)) {
                    idCandidate = await Achievement.findById(currentDoc.achievementId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.ACHIEVEMENT) }
                    else currentDoc.achievementId = idCandidate._id
                    allValid = true
                }
                else return ErrorResponses.invalidId(res, ModelsElements.ACHIEVEMENT)
            }

            if(currentDoc.surveyId === "null"){
                currentDoc.surveyId = "null"
                allValid = true
            }
            else {
                if(mongoose.Types.ObjectId.isValid(currentDoc.surveyId)) {
                    idCandidate = await Survey.findById(currentDoc.surveyId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.SURVEY) }
                    else currentDoc.surveyId = idCandidate._id
                    allValid = true
                }
                else return ErrorResponses.invalidId(res, ModelsElements.SURVEY)
            }

            if(allValid) {
                const updDoc = await Event.findByIdAndUpdate(currentDoc.id,
                    {
                        title: currentDoc.title,
                        text_paragraphs: currentDoc.text_paragraphs,
                        images: currentDoc.images,
                        images_titles: currentDoc.images_titles,
                        yearId: currentDoc.yearId,
                        achievementId: currentDoc.achievementId,
                        surveyId: currentDoc.surveyId
                    },
                    {new: true})
                if(updDoc)
                    return SuccessResponses.successElemOperation(res, ModelsElements.EVENT, CRUD_OPERATIONS.UPDATED, updDoc)
            }
        }
        catch (e) {
            console.log(e)
            return ErrorResponses.crudOperationError(res, ModelsElements.EVENT, CRUD_OPERATIONS.UPDATING, e)
        }
    }

    async getElems(req, res) {
        try {
            const elems = await Event.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/events', {title: "Events", elements: elems} )
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }
}

module.exports = new EventController()