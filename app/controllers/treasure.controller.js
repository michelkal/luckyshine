// created by Michel Kalavanda at 20210117 02:18.
// 
// michelkalavanda@gmail.com
// +2348109916000

const dotenv = require('dotenv');
const result = dotenv.config();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const dbConfig = require('../../config/database.config');
const mysql = require('mysql');

exports.treasureSearch = [
    check('latitude').not().isEmpty().withMessage('Please specify latitude for search').bail(),
    check('longitude').not().isEmpty().withMessage('Please specify longitude for search').bail(),
    check('distance').not().isEmpty().withMessage('Please specify distance for search').bail(),
    check('distance').not().isInt().withMessage('Distance is not a valid integer digit').bail(),
    (req, res) => {
        let errors =  validationResult(req);
     
        if (!errors.isEmpty()) {
         return res.status(400).json({ 
             errors: true, 
             message: errors.array() 
         })
       }

       if (![1, 10].includes(req.body.distance)) {
        return res.status(400).json({ 
            errors: true, 
            message: "Distance must be either 1 or 10" 
        })
     }


       const tokenValidation = req.headers['authorization'];

        if (!tokenValidation){
            return res.status(401).json({ 
                error: true, 
                message: 'Request is missing authorization token' 
            });
        } 
   
           jwt.verify(tokenValidation, process.env.JWT_TOKEN_KEY, function(error, decoded){
               if(error){
                   return res.status(403).json({
                       error: true,
                       message: error
                   })
               }

               const connection = mysql.createConnection({
                host     : dbConfig.server,
                user     : dbConfig.user,
                password : dbConfig.pwd,
                database : dbConfig.db
              });
            
              connection.connect();

              connection.query("SELECT *, (((acos(sin(("+ req.body.latitude + "*pi()/180)) * sin((`latitude`*pi()/180)) + cos(("+ req.body.latitude +"*pi()/180)) * cos((`latitude`*pi()/180)) * cos((("+ req.body.longitude +"- `longitude`) * pi()/180)))) * 180/pi()) * 60 * 1.1515 * 1.609344) as distance FROM `treasures` HAVING distance <= "+ req.body.distance +"", function (error, results, fields) {
                if (error) throw error;
                
                console.log('The Result is: ', results[0]);

                  return res.status(200).json({
                      error: false,
                      data: results[0],
                      message: "Successfully retrieve treasures",
                  });
    
              });
               
              connection.end();

        })
    }
];

exports.treasureSearchMoneyValue = [
    check('latitude').not().isEmpty().withMessage('Please specify latitude for search').bail(),
    check('longitude').not().isEmpty().withMessage('Please specify longitude for search').bail(),
    check('distance').not().isEmpty().withMessage('Please specify longitude for search').bail(),
    check('prize').not().isEmpty().withMessage('Please specify treasure price').bail(),
    check('prize').isInt({options: {
        min: 10,
        max: 30
    }}).withMessage('Prize must be between 10 and 30').bail(),

    (req, res) => {
        let errors =  validationResult(req);
     
        if (!errors.isEmpty()) {
         return res.status(400).json({ 
             errors: true, 
             message: errors.array() 
         })
       }

       if (![1, 10].includes(req.body.distance)) {
        return res.status(400).json({ 
            errors: true, 
            message: "Distance must be either 1 or 10" 
        })
     }

     const tokenValidation = req.headers['authorization'];

     if (!tokenValidation){
         return res.status(401).json({ 
             error: true, 
             message: 'Request is missing authorization token' 
         });
     } 

        jwt.verify(tokenValidation, process.env.JWT_TOKEN_KEY, function(error, decoded){
            if(error){
                return res.status(403).json({
                    error: true,
                    message: error
                })
            }

            const connection = mysql.createConnection({
             host     : dbConfig.server,
             user     : dbConfig.user,
             password : dbConfig.pwd,
             database : dbConfig.db
           });
         
           connection.connect();

           connection.query("SELECT id, latitude, longitude, name, money_values.amt, (3956 * 2 * ASIN(SQRT( POWER(SIN(("+ req.body.latitude +" - abs(latitude))*pi()/180/2),2)+COS("+ req.body.latitude +"*pi()/180 )*COS(abs(latitude)*pi()/180)*POWER(SIN(("+ req.body.longitude +"-longitude)*pi()/180/2),2)))) as distance FROM treasures, money_values WHERE treasures.id = money_values.treasure_id AND money_values.amt > "+ req.body.prize +" HAVING distance < "+ req.body.distance +" ORDER BY distance DESC", function (error, results, fields) {
             if (error) throw error;
             
             console.log('The Result is: ', results[0]);

               return res.status(200).json({
                   error: false,
                   data: results[0],
                   message: "Successfully retrieve treasures with money values",
               });
 
           });
            
           connection.end();

     })

    }
]