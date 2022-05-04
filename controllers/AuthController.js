const User = require('../models/User')
const Role = require('../models/Role')
const Rank = require('../models/Rank')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const ModelsElements = require("../models/models_elements")
const ErrorResponses = require('../responses/ErrorResponses')

const generateAccessToken = (id, roles, expiresTimeHours) => {
    const payload = {id, roles}
    return jwt.sign(payload, secret, {expiresIn: expiresTimeHours})
}

class AuthController {

    async reg(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, ModelsElements.USER, errors)
            }

            const {login, password, countryId} = req.body
            const candidate = await User.findOne({login})

            if (candidate) { return ErrorResponses.elementExists(res, ModelsElements.USER) }

            const salt = bcrypt.genSaltSync(6);
            const hashPassword = bcrypt.hashSync(password, salt);

            if(req.url === '/reg') {
                const userRole = await Role.findOne({value: "USER"})
                const userRank = await Rank.findOne({ countryId: countryId, points: 100 }  )

                const newUser = new User(
                    {
                        login: login,
                        password: hashPassword,
                        roles: [userRole.value],
                        rankId: userRank._id,
                        countryId: countryId
                    }
                )
                await newUser.save()
            }

            else if(req.url === '/reg-adm') {
                const userRole = await Role.findOne({value: "ADMIN"})
                const newUser = new User({login: login, password: hashPassword, roles: [userRole.value]})
                await newUser.save()
            }

            else { return ErrorResponses.noRoute(res) }

            return res.status(200).json({message: "Successful registration"})
        }
        catch (e) {
            console.log(e)
            ErrorResponses.exceptionOccurred(res, "Registration", e)
        }
    }

    async login(req, res) {
        try {
            const {login, password, remember} = req.body
            const user = await User.findOne({login})

            if (!user){ return ErrorResponses.noSuchElement(res, ModelsElements.USER) }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){ return ErrorResponses.incorrectPassword(res) }

            let token

            let isLogAdmin = false
            user.roles.forEach(role => { if (role === "ADMIN") { isLogAdmin = true } })

            if(isLogAdmin && remember === "off") {
                token = generateAccessToken(user._id, user.roles, "10h")
                res.cookie('access_token', token, {
                    maxAge: 3600000 * 10,
                    httpOnly: true
                })
                return res.render('home')
            }
            else if(isLogAdmin && remember === "on"){
                token = generateAccessToken(user._id, user.roles, "336h")
                res.cookie('access_token', token, {
                    maxAge: 3600000 * 336,
                    httpOnly: true
                })
                return res.render('home')
            }
            else {
                token = generateAccessToken(user._id, user.roles, "10h")
                return res.status(200).json(
                {
                    message: "Successful login",
                    login: user.login,
                    password: user.password,
                    achievements: user.achievements,
                    roles: user.roles,
                    score: user.score,
                    rankId: user.rankId,
                    countryId: user.countryId,
                    token
                });
            }
        }
        catch (e) {
            console.log(e)
            ErrorResponses.exceptionOccurred(res, "Login", e)
        }
    }
}

module.exports = new AuthController()