const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

const generateAccessToken = (id, roles) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret, {expiresIn: "1h"})
}

class AuthController {

    async reg(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registration validation error!", errors: errors.array() });
            }

            const {login, password} = req.body
            const candidate = await User.findOne({login})

            if (candidate) {
                res.status(400).json({message: "Such user already exist!"})
            }

            const salt = bcrypt.genSaltSync(6);
            const hashPassword = bcrypt.hashSync(password, salt);

            const userRole = await Role.findOne({value: "USER"})
            const newUser = new User({login: login, password: hashPassword, roles: [userRole.value]})
            await newUser.save()

            return res.status(200).json({"message": "Success registration"})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error occurred!", error: e.message})
        }
    }

    async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({login})

            if (!user){
                res.status(400).json({message: "No such user!"})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                res.status(400).json({message: "Incorrect password!"})
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.status(200).json({token})
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error occurred!", error: e.message})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({message: "Bad request!", error: e.message})
        }
    }
}

module.exports = new AuthController()