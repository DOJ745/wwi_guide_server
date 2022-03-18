const Year = require('../models/Year')
const DataControllerInterface = require("./interfaces/DataControllerInterface");

class YearController extends DataControllerInterface {

    async addElem(req, res) {
        try {
            const {date, title, img} = req.body
            const candidate = await Year.findOne({date})

            if (candidate) {
                res.status(400).json({message: "Such year already exist!"})
            }

            const newElem = new Year({date: date, title: title, img: img})
            await newElem.save()

            return res.status(200).json({"message": "Year successfully added"})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Error with adding the year!", error: e.message})
        }
    }

    async updateElem(req, res) {

    }

    async deleteElem(req, res) {

    }

    async getElems(req, res) {
        try {
            const years = await Year.find()
            res.json(years)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Bad request!", error: e.message})
        }
    }
}

module.exports = new YearController()