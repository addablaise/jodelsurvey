const fs = require('fs')
const {v4} = require('uuid')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { getSurveys,createSurvey
    ,findSurvey,updateSurvey,deleteSurvey } = require('../dboperations/surveyOperation')
const validator = require('express-joi-validation').createValidator({})



// get all surveys
router.route('/all').get((req,res) => {
    getSurveys({res : res})
})

// create new survey
router.route('/create').post((req,res) => {
    const surveySchema = Joi.object({
        survey_name: Joi.string().min(3).required(),
    })
    const validationResult = surveySchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.json('Survey name required')

    const {survey_name} = req.body
    const survey = {
        survey_id : v4(),
        survey_name : survey_name
    }
    createSurvey({survey:survey,res : res})
})

// view/find survey by survey id
router.route('/view/:id').get((req,res) => {
    const {id} = req.params
    findSurvey({id:id,res : res})
}) 

// update survey by survey id
router.route('/update/:id').put((req,res) => {
    const surveySchema = Joi.object({
        survey_name: Joi.string().min(3).required(),
    })
    const validationResult = surveySchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.json('Survey name required')

    const {id} = req.params
    const {survey_name} = req.body
    updateSurvey({id:id,survey_name:survey_name,res : res})
}) 

// delete survey by survey id
router.route('/delete/:id').get((req,res) => {
    const {id} = req.params
    deleteSurvey({id:id,res : res})
}) 




module.exports = router;