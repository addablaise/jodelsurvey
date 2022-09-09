const fs = require('fs')

const questionDataPath = 'data/questions.json'
const surveyDataPath = 'data/surveys.json'

async function createQuestion({ question : question,res: res }) {
    let questions = JSON.parse(fs.readFileSync(questionDataPath))

    questions.push(question)
    fs.writeFile(questionDataPath, JSON.stringify(questions, null, 2), err => {
        if(err){
            console.log('An error occured');
        }else{
            console.log('Success');
        }
    })
    return res.json(questions)
}

async function findSurveyQuestions({ id : id,res: res }) {
    let questions = JSON.parse(fs.readFileSync(questionDataPath))
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    const survey = surveys.find(survey => survey.survey_id === id)
    const surveyQuestions = questions.filter(question => question.survey_id === id)
    if(!surveyQuestions) return res.json('No questions for this survey')
    return res.json({
        survey,
        "questions":surveyQuestions
    })
}

module.exports = {
    createQuestion: createQuestion,
    findSurveyQuestions: findSurveyQuestions,
}