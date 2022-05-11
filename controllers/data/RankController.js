const Rank = require('../../models/Rank')
const Country = require('../../models/Country')
const ErrorResponses = require("../../responses/ErrorResponses")
const ModelsElements = require("../../models/models_elements")
const CRUD_OPERATIONS = require('../../config/crud_operations')
const IDataController = require("../interfaces/DataControllerInterface");
const {validationResult} = require("express-validator");
const Armament = require("../../models/Armament");

class RankController extends IDataController {
    constructor() { super(); }

    async addElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {return ErrorResponses.modelValidationError(res, ModelsElements.RANK, errors)}

            const {name, points, img, countryId} = req.body

            const candidate = await Rank.findOne({name})
            const idCandidate = await Country.findById(countryId)

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.RANK) }
            if (idCandidate === null){ return ErrorResponses.noSuchElement(res, ModelsElements.COUNTRY) }

            const newElem = new Rank({name: name, points: points, img: img, countryId: countryId})
            await newElem.save()

            return res.status(200).json({message: "Rank successfully added"})
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
        }
        catch (e){

        }
    }

    async deleteElem(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.RANK, errors)
            }
        }
        catch (e){

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