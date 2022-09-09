const {v4} = require('uuid')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { createQuestion,findSurveyQuestions } = require('../dboperations/questionOperation')

// create new question
router.route('/create').post((req,res) => {
    const questionSchema = Joi.object({
        survey_id: Joi.string().min(3).required(),
        question_string: Joi.string().min(3).required(),
        answers: Joi.required(),
    })
    const validationResult = questionSchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.status(400).json(validationErrors(valResult.error.details))

    const {survey_id} = req.body
    const {question_string} = req.body
    const {answers} = req.body
    const question = {
        question_id : v4(),
        survey_id : survey_id,
        question_string : question_string,
        answers : answers
    }
    console.log(question);
    createQuestion({question:question,res : res})
})

// view/find question(s) by survey id
router.route('/survey/:id').get((req,res) => {
    const {id} = req.params
    findSurveyQuestions({id:id,res : res})
}) 


module.exports = router;