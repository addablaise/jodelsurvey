require('dotenv').config();
module.exports = (req,res,next) => {
    var auth_token = req.headers['auth_token']; 
    console.log(auth_token);
    if(auth_token === process.env.AUTH_TOKEN) next()
    return res.status(403).json({
        status: 'error',
        message: 'Not Authorised'
    })
}