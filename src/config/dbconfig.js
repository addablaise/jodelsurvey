require('dotenv').config();
let dbconfig = {
    host: process.env.HOST,
    port: process.env.PORT, 
    database: process.env.DATABASE, 
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    connectionLimit: 1000
};

module.exports = dbconfig;