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
            res.json("json message")
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = new AuthController()