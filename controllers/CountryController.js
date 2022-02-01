const Country = require('../models/Country')

class CountryController {

    async addCountry(req, res) {
        try {
            const {name, img} = req.body
            const candidate = await Country.findOne({name})

            if (candidate) {
                res.status(400).json({message: "Such country already exist!"})
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

    async getCountries(req, res) {
        try {
            const countries = await Country.find()
            res.json(countries)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Bad request!", error: e.message})
        }
    }

}

module.exports = new CountryController()