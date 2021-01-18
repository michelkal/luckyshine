// created by Michel Kalavanda at 20210117 01:40.
// 
// michelkalavanda@gmail.com
// +2348109916000

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dbConfig = require('../../config/database.config');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

//Authenticate User
exports.authUser = [
    check('email').isEmail().withMessage('Username must be a valid email ID'),
    check('password').not().isEmpty().withMessage('Password cannot be empty'),
    check('name').not().isEmpty().withMessage('Name cannot be empty'),

    (request, response) => {
        //VALIDATE REQUEST
        let errors = validationResult(request);
        if(!errors.isEmpty()){

            return response.status(401).json({
                error: true,
                message: errors.array()
            })
        }

        const connection = mysql.createConnection({
            host     : dbConfig.server,
            user     : dbConfig.user,
            password : dbConfig.pwd,
            database : dbConfig.db
          });
        
          connection.connect();
         var password = 
          connection.query('SELECT * FROM `users` WHERE `email` = ? and `name` = ?', [request.body.email, request.body.name], function (error, results, fields) {
            if (error) throw error;
            //console.log('The Result is: ', results[0]);

            var passwordIsValid = bcrypt.compareSync(request.body.password, results[0].password);
            if (!passwordIsValid) return response.status(401).json({
                error: true,
                data: {
                    user: null,
                    token: null
                },
                message: "Incorrect password provided"
             });


             //SIGN A JWT FOR TREASURE SEARCH REQUEST
             var token = jwt.sign({ id: results[0].id, email: request.body.email}, process.env.JWT_TOKEN_KEY, {
                expiresIn: 86400 // expires in 24 hours
              });
              return response.status(200).json({
                  error: false,
                  data: {
                      user: {
                          name: results[0].name,
                          email: request.body.email
                      },
                      token: token
                  },
                  message: "User authenticated successfully",
                  comment: "Use Token for authorization header when searching for treasure"
              });

          });
           
          connection.end();

    }
]