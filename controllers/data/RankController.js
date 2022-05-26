const Rank = require('../../models/Rank')
const Country = require('../../models/Country')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const mongoose = require("mongoose");
const TestTheme = require("../../models/TestTheme");
const SuccessResponses = require("../../responses/SuccessResponses");

class RankController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return ErrorResponses.modelValidationError(res, ModelsElements.RANK, errors) }

            const {name, points, img, countryId} = req.body
            let newElem, idCandidate
            const candidate = await Rank.findOne({name})
            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.RANK) }

            if(countryId === "null") {
                newElem = new Rank({name: name, points: points, img: img, countryId: "null"})
                await newElem.save()
            }
            else {
                if(mongoose.Types.ObjectId.isValid(countryId)) {
                    idCandidate = await Country.findById(countryId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.COUNTRY) }
                    newElem = new TestTheme({name: name, points: points, img: img, achievementId: achievementId})
                    await newElem.save()
                }
                else return ErrorResponses.invalidId(res, ModelsElements.COUNTRY)
            }
            return SuccessResponses.successElemOperation(res, ModelsElements.RANK, CRUD_OPERATIONS.ADDED, null)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.crudOperationError(res, ModelsElements.RANK, CRUD_OPERATIONS.ADDING,  e)
        }
    }

    async updateElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.RANK, errors)
            }

            const {name, points, img, countryId, id} = req.body

            if(countryId === "null") {
                const updDoc = await Rank.findByIdAndUpdate(id,
                    {
                        name: name,
                        points: points,
                        img: img,
                        countryId: "null"
                    },
                    {new: true})
                if(updDoc)
                    return SuccessResponses.successElemOperation(res, ModelsElements.RANK, CRUD_OPERATIONS.UPDATED, updDoc)
            }
            else {
                if(mongoose.Types.ObjectId.isValid(countryId)) {
                    const idCandidate = await Country.findById(countryId)
                    if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.COUNTRY) }
                    const updDoc = await Rank.findByIdAndUpdate(id,
                        {
                            name: name,
                            points: points,
                            img: img,
                            countryId: countryId
                        },
                        {new: true})
                    if(updDoc)
                        return SuccessResponses.successElemOperation(res, ModelsElements.RANK, CRUD_OPERATIONS.UPDATED, updDoc)
                }
                else return ErrorResponses.invalidId(res, ModelsElements.COUNTRY)
            }
        }
        catch (e){
            console.log(e)
            return ErrorResponses.crudOperationError(res, ModelsElements.RANK, CRUD_OPERATIONS.UPDATING, e)
        }
    }

    async getElems(req, res) {
        try {
            const elems = await Rank.find()
            if(req.baseUrl === '/api.wwi-guide.by') return res.json(elems)
            else res.render('data/ranks', {title: "Ranks", elements: elems})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }

}

module.exports = new RankController()