const Country = require('../models/Country')

class CountryController {

    async addCountry(req, res){

    }

    async getCountries(req, res){
        try {
            const {name} = await Country.find()
            res.json(name)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Bad request!", error: e.message})
        }
    }

}

module.exports = new CountryController()