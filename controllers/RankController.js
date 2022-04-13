const Rank = require('../models/Rank')
const Country = require('../models/Country')
const ErrorResponses = require("../responses/error_responses")
const ModelsElements = require("../models/models_elements")
const IDataController = require("./interfaces/DataControllerInterface");

class RankController extends IDataController {

    async addElem(req, res) {
        try {
            const {name, points, img, countryId} = req.body

            const candidate = await Rank.findOne({name})
            const idCandidate = await Country.findById(countryId)

            if (candidate) {
                return ErrorResponses.elementExists(res, ModelsElements.RANK)
            }

            if (idCandidate === null){
                return ErrorResponses.noSuchElement(res, ModelsElements.RANK)
            }

            const newElem = new Rank({name: name, points: points, img: img, countryId: countryId})
            await newElem.save()

            return res.status(200).json({message: "Rank successfully added"})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.addingElementError(res, ModelsElements.RANK, e)
        }
    }

    async updateElem(req, res) {

    }

    async deleteElem(req, res) {

    }

    async getElems(req, res) {
        try {
            const elems = await Rank.find()
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            ErrorResponses.badRequest(res, e)
        }
    }

}

module.exports = new RankController()