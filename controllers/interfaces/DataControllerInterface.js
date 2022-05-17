const {validationResult} = require("express-validator");
const ErrorResponses = require("../../responses/ErrorResponses");
const ModelsElements = require("../../models/models_elements");
const SuccessResponses = require("../../responses/SuccessResponses");
const CRUD_OPERATIONS = require("../../config/crud_operations");
const TestTheme = require("../../models/TestTheme");
const User = require("../../models/User");
const Armament = require("../../models/Armament");
const Event = require("../../models/Event");
const Achievement = require("../../models/Achievement");
const Rank = require("../../models/Rank");
const LogModel = require("../../models/LogModel");
const TestQuestion = require("../../models/TestQuestion");
const TestAnswer = require("../../models/TestAnswers");
const Survey = require("../../models/Survey");
const Country = require("../../models/Country");
const Year = require("../../models/Year");

class IDataController {

    constructor() {
        if (!this.getElems) {
            throw new Error("Controller must return collection of items!")
        }

        if(!this.addElem) {
            throw new Error("Controller must add elements!")
        }

        if(!this.updateElem) {
            throw new Error("Controller must update elements!")
        }
    }

    getElems(req, res){}
    addElem(req, res){}
    updateElem(req, res){}
    //deleteElem(req, res){}

    async deleteElem(req, res, modelNameConst) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return ErrorResponses.modelValidationError(res, modelNameConst, errors)
            }

            const {id} = req.body
            switch(modelNameConst) {

                // ----- Child tables -----
                case ModelsElements.EVENT:
                    const deletedEvent = await Event.findByIdAndDelete(id)
                    if(deletedEvent)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.ARMAMENT:
                    const deletedArmament = await Armament.findByIdAndDelete(id)
                    if(deletedArmament)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.RANK:
                    const deletedRank = await Rank.findByIdAndDelete(id)
                    if(deletedRank)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.LOG_MODEL:
                    const deletedLog = await LogModel.findByIdAndDelete(id)
                    if(deletedLog)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.USER:
                    const deletedUser = await User.findByIdAndDelete(id)
                    if(deletedUser)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.TEST_ANSWER:
                    const deletedAnswer = await TestAnswer.findByIdAndDelete(id)
                    if(deletedAnswer)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                // ----- Parent tables -----

                case ModelsElements.ACHIEVEMENT:

                    const foreignUsersAch = await User.find({achievements: { $in: [id]} })
                    if(foreignUsersAch.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.USER, foreignUsersAch)
                    }
                    const foreignArmamentsAch = await Armament.find({achievementId: id})
                    if(foreignArmamentsAch.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.ARMAMENT, foreignArmamentsAch)
                    }
                    const foreignEventsAch = await Event.find({achievementId: id})
                    if(foreignEventsAch.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.EVENT, foreignEventsAch)
                    }
                    const foreignTestThemesAch = await TestTheme.find({achievementId: id})
                    if(foreignTestThemesAch.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.TEST_THEME, foreignTestThemesAch)
                    }
                    const deletedAchievement = await Achievement.findByIdAndDelete(id)
                    if(deletedAchievement)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.TEST_THEME:

                    const foreignThemeTestQuestions = await TestQuestion.find({testThemeId: id })
                    if(foreignThemeTestQuestions.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.TEST_QUESTION, foreignThemeTestQuestions)
                    }
                    const deletedTheme = await TestTheme.findByIdAndDelete(id)
                    if(deletedTheme)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.YEAR:

                    const foreignYearEvents = await Event.find({yearId: id })
                    if(foreignYearEvents.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.EVENT, foreignYearEvents)
                    }
                    const deletedYear = await Year.findByIdAndDelete(id)
                    if(deletedYear)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.TEST_QUESTION:

                    const foreignTestQuestionAnswers = await TestAnswer.find({testQuestionId: id })
                    if(foreignTestQuestionAnswers.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.TEST_ANSWER, foreignTestQuestionAnswers)
                    }
                    const deletedTestQuestion = await TestQuestion.findByIdAndDelete(id)
                    if(deletedTestQuestion)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.COUNTRY:

                    const foreignCountryRanks = await Rank.find({countryId: id })
                    if(foreignCountryRanks.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.RANK, foreignCountryRanks)
                    }
                    const foreignCountryUsers = await User.find({countryId: id })
                    if(foreignCountryUsers.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.USER, foreignCountryUsers)
                    }
                    const deletedCountry = await Country.findByIdAndDelete(id)
                    if(deletedCountry)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;

                case ModelsElements.SURVEY:

                    const foreignSurveyArmaments = await Armament.find({surveyId: id })
                    if(foreignSurveyArmaments.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.ARMAMENT, foreignSurveyArmaments)
                    }
                    const foreignSurveyEvents= await Event.find({surveyId: id })
                    if(foreignSurveyEvents.length > 0) {
                        return ErrorResponses.foreignKeyConstraint(res, modelNameConst, ModelsElements.EVENT, foreignSurveyEvents)
                    }
                    const deletedSurvey = await Survey.findByIdAndDelete(id)
                    if(deletedSurvey)
                        return SuccessResponses.successElemOperation(res, modelNameConst, CRUD_OPERATIONS.DELETED, null)
                    break;
            }

        }
        catch (e) {
            console.log("ERROR OCCURRED: " + e)
            return ErrorResponses.crudOperationError(res, modelNameConst, CRUD_OPERATIONS.DELETING, e)
        }
    }
}

module.exports = IDataController