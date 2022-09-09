const fs = require('fs')

const surveyDataPath = 'data/surveys.json'

async function getSurveys({ res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    return res.json(surveys)
}

async function findSurvey({ id : id,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    const survey = surveys.find(survey => survey.survey_id === id)
    if(!survey) return res.json('Survey not found')
    return res.json(survey)
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
    return res.json(surveys)
}


async function updateSurvey({ id : id,survey_name:survey_name,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    const index = surveys.findIndex(survey => survey.survey_id === id)
    if (index < 0) return res.json('Invalid Survey ID')
    surveys[index].survey_name = survey_name
    fs.writeFile(surveyDataPath, JSON.stringify(surveys, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    return res.json(surveys[index])
}

async function deleteSurvey({ id : id,res: res }) {
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    var surveyToDelete = surveys.find(survey => survey.survey_id === id)
    if(!surveyToDelete) return res.json('Survey not found')
    const surveyRemaining = surveys.filter(survey => survey.survey_id !== id)
    fs.writeFile(surveyDataPath, JSON.stringify(surveyRemaining, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    return res.json(surveyRemaining)
}


module.exports = {
    getSurveys: getSurveys,
    createSurvey: createSurvey,
    findSurvey: findSurvey,
    updateSurvey: updateSurvey,
    deleteSurvey: deleteSurvey
}