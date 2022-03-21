const Rank = require('../models/Rank')
const IDataController = require("./interfaces/DataControllerInterface");

class RankController extends IDataController {

    async addElem(req, res) {
        try {
            const {name, points, img, countryId} = req.body
            const candidate = await Rank.findOne({name})

            if (candidate) {
                res.status(400).json({message: "Such rank already exist!"})
            }

            const newElem = new Rank({name: name, points: points, img: img, countryId: countryId})
            await newElem.save()

            return res.status(200).json({"message": "Rank successfully added"})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Error with adding the country!", error: e.message})
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
            res.status(400).json({message: "Bad request!", error: e.message})
        }
    }

}

module.exports = new RankController()