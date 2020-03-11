const User = require('../models/users.model.js');
const { check, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const result = dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const log = require('log-to-file');
const validator = require('../customs/validator.custom.js');

const opts = {
    errorEventName:'error',
        logDirectory: './logs',
        fileNamePattern:'giftify-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );

exports.createNewUser = [
    check('email').isEmail().withMessage('Please provide a validl user email'),
    check('name').not().isEmpty().withMessage('Name cannot be empty'),
    //check('phone').not().isMobilePhone().withMessage('Invalid mobile number'),
    check('phone').not().isEmpty().withMessage('Please provide user phone'),

    (req, res) => {
     const errors = validationResult(req);

     if(validator.isValidPassword(req.body.password) !== true){
        return res.status(402).json({
            error: true,
            message: "Password must contain at least one uppercase letter, lowercase, number and a special character"
        })
     }

     if(!errors.isEmpty()){
         return res.status(402).json({
             error: true,
             message: errors.array()
         })
     }
     
     const tokenValidation = req.headers['x-access-key'];
     if (!tokenValidation) return res.status(401).json({ 
         error: true, 
         message: 'Request is missing authorization token' 
        });

     jwt.verify(tokenValidation, process.env.JWT_TOKEN_KEY, function(error, decoded){
         if(error){
             return res.status(403).json({
                 error: true,
                 message: error
             });
         }

         log.info('Decode TOKEN', decoded, new Date().toJSON());
     });

     
    const createUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    country: req.body.country,
    state: req.body.state,
    address: req.body.address,
    status: 'pending',
    activation_key: bcrypt.hashSync(req.body.phone + req.body.email, 8)
    });

    createUser.save()
    .then(data => {
        res.send(data);
    }).catch(err => {

        log.error('Exception occured creating user record', err, new Date().toJSON());

        res.status(403).json({
            error: true,
            message: err.message || "An error occured while creating user. Try again later."
        });
    });


    }
];

//Authenticate User
exports.authUser = [
    check('username').isEmail().withMessage('Username must be a valid email ID'),
    check('access_key').not().isEmpty().withMessage('Password cannot be empty'),

    (request, response) => {
        let errors = validationResult(request);
        if(!errors.isEmpty()){

            log.error('Authentication error oocured', errors.array(), new Date().toJSON());

            return response.status(401).json({
                error: true,
                message: errors.array()
            })
        }

        const tokenValidation = request.headers['x-access-key'];
     if (!tokenValidation) return response.status(401).json({ 
         error: true, 
         message: 'Request is missing authorization token' 
        });

        jwt.verify(tokenValidation, process.env.JWT_TOKEN_KEY, function(error, decoded){
            if(error){
                return response.status(403).json({
                    error: true,
                    message: error
                })
            }
   
            log.info('Decode TOKEN', decoded, new Date().toJSON());
            
        });

        User.findOne({ email: request.body.username }, function (err, user) {
            if (err) return response.status(500).json({
                error: true,
                message: err
            });
            if (!user) return response.status(404).json({
                error: true,
                message: "Unable to locate user record. No such user exists"
            });
            
            var passwordIsValid = bcrypt.compareSync(request.body.access_key, user.password);
            if (!passwordIsValid) return response.status(401).json({
                error: true,
                data: {
                    user: null,
                    token: null
                },
                message: "Incorrect password provided"
             });
            
            var token = jwt.sign({ id: user._id, email: user.email, status: user.status }, process.env.JWT_TOKEN_KEY, {
              expiresIn: 86400 // expires in 24 hours
            });
            
            return response.status(200).json({
                error: false,
                data: {
                    user: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        state: user.state,
                        country: user.country
                    },
                    token: token
                },
                message: "User authenticated successfully"
            });
          });

    }
]