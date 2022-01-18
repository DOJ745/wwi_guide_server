const User = require('../models/User')
const Role = require('../models/Role')

class AuthController {

    async reg(req, res) {
        try {

        }
        catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {

        }
        catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {
        try {
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})

            await Role(userRole).save()
            await Role(adminRole).save()

            res.json("json message")
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()