const fs = require('fs')

const surveyDataPath = 'data/surveys.json'
const questionDataPath = 'data/questions.json'

var dbconfig = require('../config/dbconfig')
const { createPool } = require('mysql');

// if fetching a survey from real database eg sql
async function getSurveybyID_RealServer({ id: id, res: res }) 
    {
    const pool = await createPool(dbconfig)
    pool.query(`select * from survey WHERE survey_id = '${id}'`, function (err, result, fields) {
        if (err) {
            return res.json(err);
        }
        if (result.length > 0) return errorResponse(res,'Survey not found')
        return res.json({
            status: 'success',
            'survey': result})
    })
}

async function getSurveys({ res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    return res.json({
        status: 'success',
        'surveys': surveys})
}

async function findSurvey({ id : id,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    const survey = surveys.find(survey => survey.survey_id === id)
    if(!survey) return errorResponse(res,'Survey not found')
    return res.json({
        status: 'success',
        'survey': survey})
}

async function createSurvey({ survey : survey,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))

    surveys.push(survey)
    fs.writeFile(surveyDataPath, JSON.stringify(surveys, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    return res.json({
        status: 'success',
        'surveys':surveys})
}


async function updateSurvey({ id : id,survey_name:survey_name,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    const index = surveys.findIndex(survey => survey.survey_id === id)
    if (index < 0) return errorResponse(res,'Invalid Survey ID')
    surveys[index].survey_name = survey_name
    fs.writeFile(surveyDataPath, JSON.stringify(surveys, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    return res.json({
        status: 'success',
        'survey': surveys[index]})
}

// deleting a survey will delete all questions associated with the survey
async function deleteSurvey({ id : id,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    let questions = JSON.parse(fs.readFileSync(questionDataPath))

    var surveyToDelete = surveys.find(survey => survey.survey_id === id)
    if(!surveyToDelete) return errorResponse(res,'Survey not found')
    // filter out surveys that dont match survey ID
    const surveyRemaining = surveys.filter(survey => survey.survey_id !== id)
    // filter out questions that dont match survey ID
    const questionsRemaining = questions.filter(question => question.survey_id !== id)
    fs.writeFile(surveyDataPath, JSON.stringify(surveyRemaining, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    fs.writeFile(questionDataPath, JSON.stringify(questionsRemaining, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    return res.json({
        status: 'success',
        'surveys': surveyRemaining})
}


function errorResponse(res,msg){
    return res.json({
        status: 'error',
        message: msg
    })
}


module.exports = {
    getSurveys: getSurveys,
    createSurvey: createSurvey,
    findSurvey: findSurvey,
    updateSurvey: updateSurvey,
    deleteSurvey: deleteSurvey,
    errorResponse: errorResponse
}