const fs = require('fs')

const questionDataPath = 'data/questions.json'
const surveyDataPath = 'data/surveys.json'

async function createQuestion({ question: question, res: res }) {
    let questions = JSON.parse(fs.readFileSync(questionDataPath))
    questions.push(question)
    await fs.writeFile(questionDataPath, JSON.stringify(questions, null, 2), err => {
        if (err) {
            console.log('An error occured');
        } else {
            console.log('Success');
        }
    })
    const surveyQuestions = questions.filter(questionAll => questionAll.survey_id === question.survey_id)
    if (surveyQuestions.length === 0) return errorResponse(res,'No questions for this survey')
    return res.json({
        status: 'success',
        "questions": surveyQuestions
    })
}

async function updateQuestion({ question: question, res: res }) {
    let questions = JSON.parse(fs.readFileSync(questionDataPath))
    const index = questions.findIndex(question => question.question_id === question.question_id)
    if (index < 0) return errorResponse(res,'Invalid Question ID')
    questions[index].question_string = question.question_string
    questions[index].answers = question.answers
    fs.writeFile(questionDataPath, JSON.stringify(questions, null, 2), err => {
        if (err) {
            console.log('An error occured');
        } else {
            console.log('Success');
        }
    })
    return res.json({
        status: 'success',
        "question": questions[index]})
}

async function updateQuestions({ questionArray: questionArray, res: res }) {
    let questions = JSON.parse(fs.readFileSync(questionDataPath))
    // loop through questions and update
    for (const qst of questionArray) {
        const index = questions.findIndex(question => question.question_id === qst.question_id)
        if (index < 0) return errorResponse(res,{
            question_id: qst.question_id,
            question_string: qst.question_string,
            err:'Invalid Question ID'})
            
        questions[index].answers = qst.answers
        fs.writeFile(questionDataPath, JSON.stringify(questions, null, 2), err => {
            if (err) {
                console.log('An error occured');
            } else {
                console.log('Success');
            }
        })
        console.log(qst.answers);
    }

    return res.json({
        status: 'success',
        message: 'Survey Completed successfully'})
}


async function findSurveyQuestions({ id: id, res: res }) {
    let questions = JSON.parse(fs.readFileSync(questionDataPath))
    let surveys = JSON.parse(fs.readFileSync(surveyDataPath))
    const survey = surveys.find(survey => survey.survey_id === id)
    const surveyQuestions = questions.filter(question => question.survey_id === id)
    if (surveyQuestions.length === 0) return errorResponse(res,'No questions for this survey')
    return res.json({
        status: 'success',
        survey,
        "questions": surveyQuestions
    })
}

function errorResponse(res,msg){
    return res.json({
        status: 'error',
        message: msg
    })
}

function validationErrors(message){
    return {
        status: 'error',
        message: message
    }
}

module.exports = {
    createQuestion: createQuestion,
    findSurveyQuestions: findSurveyQuestions,
    updateQuestion: updateQuestion,
    updateQuestions: updateQuestions,
    errorResponse:errorResponse,
    validationErrors: validationErrors
}