const Country = require('../models/Country')
const IDataController = require("./interfaces/DataControllerInterface");

class CountryController extends IDataController {

    constructor() { super(); }

    async addElem(req, res) {
        try {
            const {name, img} = req.body
            const candidate = await Country.findOne({name})

            if (candidate) {
                res.status(400).json({message: "Such country already exist!"})
                return;
            }

            const newElem = new Country({name: name, img: img})
            await newElem.save()

            return res.status(200).json({"message": "Country successfully added"})
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
            const elems = await Country.find()
            res.json(elems)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Bad request!", error: e.message})
        }
    }

}

module.exports = new CountryController()