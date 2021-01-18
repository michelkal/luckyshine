// created by Michel Kalavanda at 20210117 21:10.
// 
// michelkalavanda@gmail.com
// +2348109916000

const dbConfig = require('./config/database.config.js');
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host     : dbConfig.server,
            user     : dbConfig.user,
            password : dbConfig.pwd,
            database : dbConfig.db
        },
        migrations: {
            directory: __dirname + "/migrations"
        },
        seeds: {
            directory: __dirname + "/seeds"
        }
    }
}