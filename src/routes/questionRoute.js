const {v4} = require('uuid')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { createQuestion,findSurveyQuestions,updateQuestion,
    updateQuestions,errorResponse,validationErrors } = require('../dboperations/questionOperation')
const checkAuth = require('../middleware/checkAuth')

// create new question
router.route('/create').post((req,res) => {
    const questionSchema = Joi.object({
        survey_id: Joi.string().min(3).required(),
        question_string: Joi.string().min(3).required(),
        answers: Joi.array().required(),
    })
    const validationResult = questionSchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.status(400).json(validationErrors(validationResult.error.details))

    const {survey_id,question_string,answers} = req.body
    const question = {
        question_id : v4(),
        survey_id : survey_id,
        question_string : question_string,
        answers : answers
    }
    createQuestion({question:question,res : res})
})


// update question
router.route('/update').post((req,res) => {
    const questionSchema = Joi.object({
        question_id: Joi.string().min(3).required(),
        question_string: Joi.string().min(3).required(),
        answers: Joi.array().required(),
    })
    const validationResult = questionSchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.status(400).json(validationErrors(validationResult.error.details))

    const {question_id,question_string,answers} = req.body
    const question = {
        question_id : question_id,
        question_string : question_string,
        answers : answers
    }
    updateQuestion({question:question,res : res})
})

// submit answer to question
router.route('/submit').post((req,res) => {
    const questionSchema = Joi.object({
        question_id: Joi.string().min(3).required(),
        question_string: Joi.string().min(3).required(),
        answers: Joi.array().required(),
    })

    const validationResult = questionSchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.status(400).json(validationErrors(validationResult.error.details))
    const {question_id,question_string,answers} = req.body
    const question = {
        question_id : question_id,
        question_string : question_string,
        answers : answers
    }
    const hasSelectedAns = answers.find(answer => answer.selected === 'true')
    if(!hasSelectedAns) return errorResponse(res,'No selected Answer')
    updateQuestion({question:question,res : res})
})


router.route('/submitqsts').post((req,res) => {
    const questionsSchema = Joi.object({
        survey_id: Joi.string().required(),
        questions: Joi.array().required(),
    })
    const validationResult = questionsSchema.validate(req.body, {abortEarly: false})
    if(validationResult.error) return res.status(400).json(validationErrors(validationResult.error.details))
    const {survey_id,questions} = req.body
    // loop through questions and see if they are all answered
    let unAnsweredQst = []
    for(const question of questions) {
        const hasSelectedAns = question.answers.find(answer => answer.selected === 'true')
        if(!hasSelectedAns) {
            unAnsweredQst.push({
                question_id: question.question_id,
                question_string: question.question_string,
                message: 'No answer selected'
            })
        }
    }
    if(unAnsweredQst.length !== 0) return errorResponse(res,unAnsweredQst)
    updateQuestions({questionArray:questions,res : res})
    // return res.json('hi')
})

// view/find question(s) by survey id
router.route('/survey/:id').get((req,res) => {
    const {id} = req.params
    findSurveyQuestions({id:id,res : res})
}) 


module.exports = router;