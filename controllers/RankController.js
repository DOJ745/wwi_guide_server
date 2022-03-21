const Rank = require('../models/Rank')
const DataControllerInterface = require("./interfaces/DataControllerInterface");

class RankController extends DataControllerInterface {

    constructor() { super(); }

    async addElem(req, res) {
        try {
            /*const {name, img} = req.body
            const candidate = await Rank.findOne({name})

            if (candidate) {
                res.status(400).json({message: "Such country already exist!"})
            }

            const newElem = new Rank({name: name, img: img})*/
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