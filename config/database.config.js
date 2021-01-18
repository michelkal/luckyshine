// created by Michel Kalavanda at 20210116 09:10.
// 
// michelkalavanda@gmail.com
// +2348109916000

const dotenv = require('dotenv');
const result = dotenv.config();
module.exports = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    db: process.env.DB_NAME,
    pwd: process.env.DB_PASSWORD
}