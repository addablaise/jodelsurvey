const express = require('express')
const app = express()
app.use(express.json())
// append /api to endpoints
app.use('/api/survey', require('./src/routes/surveyRoute'));


app.get('/', (req, res) => {
    return res.json(`Jodel Survey app by  Blaise`)
})

app.listen(3000, () => {
    console.log('Now Listening on port 3000');
})