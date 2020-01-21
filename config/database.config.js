const dotenv = require('dotenv');
const result = dotenv.config();
module.exports = {
    url: process.env.DB_CONNECTION
}