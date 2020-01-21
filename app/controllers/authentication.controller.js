const dotenv = require('dotenv');
const result = dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const apiModel = require('../models/apikeys.model.js');
const { check, validationResult } = require('express-validator');
const log = require('log-to-file');

exports.createAppToken = [
    check('app_id').not().isEmpty().withMessage('App ID is not provided for validation'),
    check('app_id').isLength({min: 8, max: 8}).withMessage("App ID must be exactly 8 digits"),
    (req, res) => {
   const errors = validationResult(req);
   console.log(errors);

   if (!errors.isEmpty()) {
    return res.status(400).json({ 
        errors: true, 
        message: errors.array() 
    })
  }

  //const tokenValidation = req.headers['x-access-key'];

  //if (!tokenValidation) return res.status(401).json({ error: true, message: 'Request is missing authorization token' });
  /*if(req.body.app_id !== process.env.API_APP_ID)
  return res.status(402).json({ 
      error: true, 
      message: 'Invalid App ID provided' 
    });
*/
  try{
    apiModel.findOne({app_id: req.body.app_id, environment: process.env.APP_ENV, status: 'active'}, {environment: process.env.APP_ENV}, function(err, api){
        if (err) 
        return res.status(500).json({
            error: true, 
            message: 'There was an error retrieving app ID info'
        });

        if (!apiModel) 
        return res.status(404).json({
            error: true, 
            message: 'Invalid App ID provided. No such App ID exist for tokenization'
        });

       // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        //if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        const token = jwt.sign({id: api.app_id}, process.env.JWT_TOKEN_KEY, {
           expiresIn: 86400 //24 Hours expiration
        });

        log(token, 'authLog.log');

        return res.status(200).json({
            error: false, 
            token: token, 
            message: 'Successfully signed API token'
        });

    });
  }catch(error){
    console.log(error);
  }

}];

exports.identificationSTart = [
    check('app_id').not().isEmpty().withMessage('Application ID cannot be empty'),
    check('name').not().isEmpty().withMessage('Please provide application name'),
    (req, res) => {
      const errors = validationResult(req);
      log(errors, 'authLog.log');

      if(!errors.isEmpty())
      return res.status(402).json({
          error: true, 
          message: errors.array()
        });

        const createApp = new apiModel({
            name: req.body.name,
            app_id: req.body.app_id,
            environment: process.env.APP_ENV,
            status: 'active',
            life_span: '5',
            extra: null
        });

        /*{
                description: 'Initial Application access key for API',
                author: 'Michel Kalavanda',
                developer: 'Obi Arine Chukwu'
            }*/

        createApp.save()
        .then(data => {
            res.status(200).json({
                error: false,
                message: 'New application token access created successfully',
                details: data
            });
        }).catch(err => {
            res.status(500).json({
                error: true,
                message: err.message || "An error occured while creating merchant. Try again later."
            });
        });
    }
]