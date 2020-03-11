const Merchant = require('../models/merchant.model.js');
const { check, validationResult } = require('express-validator');
const multer  = require('multer');

const opts = {
    errorEventName:'error',
        logDirectory: './logs',
        fileNamePattern:'giftify-<DATE>.log',
        dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );
const dotenv = require('dotenv');
const result = dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAll = (req, res) => {

};

exports.registerNew = [

    check('email').isEmail().withMessage("Email must be a valid email ID"),
    check('name').isLength({ min: 5 }).withMessage("Merchant name must have at least 5 characters"),
    check('country').not().isEmpty().withMessage("Country name must not be empty"),
    check('state').not().isEmpty().withMessage("State name must not be empty"),

(req, res) => {
    const errors = validationResult(req)
    /*if(!req.body.content) {
        return res.status(400).send({
            message: "Insuficient details for merchant creation"
        });
    }*/

    

    if (!errors.isEmpty()) {

        log.warn("An error occured while creating merchant", errors);

        return res.status(400).json({ 
            error: true,
            message: errors.array() 
        })
      }

      const tokenValidation = req.headers['x-access-key'];
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
            });
        }

        log.info('Decode TOKEN On Merchant CREATION', decoded, new Date().toJSON());
    });

    let merKey = jwt.sign({
        merchantPhone: req.body.phone, 
        merchantName: req.body.name,
        createdAt: new Date().toJSON(),
        signedBy: tokenValidation
    }, process.env.JWT_TOKEN_KEY, {
        expiresIn: 24883200 //One year
     });
    // Create a Note
    const createMerchant = new Merchant({

        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        country: req.body.country,
        state: req.body.state,
        address: req.body.address,
        description: req.body.description,
        category: req.body.category,
        extra: req.body.extra,
        merchant_key: merKey

    });

    createMerchant.save()
    .then(data => {
        let dbResponse = data.toJSON();
        res.status(200).json({
            error: false,
            message: "Merchant registered successfully",
            merchantKey: data.merchant_key
        });
    }).catch(err => {
        log.warn('MERCHANT CREATION ERROR OCCURED', "\n", err);
        res.status(500).json({
            error: true,
            message: err.message || "An error occured while creating merchant. Try again later."
        });
    });

}];

exports.getByMerchantToken = (req, res) => {

};


exports.getSingleMerchant = (req, res) => {

    let tokenValidation = req.headers['x-access-key'];
    let merchantKeyToken = req.headers['merchant-token'];
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
            });
        }

        log.info('Decode TOKEN On Get Merchant Details', decoded, new Date().toJSON());
    });

    let decodedMerchantToken = jwt.verify(merchantKeyToken, process.env.JWT_TOKEN_KEY, function(error, decoded){
        if(error){
            return res.status(403).json({
                error: true,
                message: error
            });
        }

        log.info('Decode TOKEN On Get Merchant Details', decoded, new Date().toJSON());

        return decoded;
    })

    /*return res.status(200).json({
        error: false,
        message: decodedMerchantToken.merchantPhone
    });*/

    Merchant.findOne({ phone: decodedMerchantToken.merchantPhone, name: decodedMerchantToken.merchantName }, function (err, merchant) {
        if (err) {
            log.warn("ERROR OCCURED RETRIEVING MERCHANT", "\n", err);
            return response.status(500).json({
                error: true,
                message: err
            });
        }
        if (!merchant) return res.status(404).json({
            error: true,
            message: "No merchant exists with provided merchant key"
        });

        switch(true){
            case merchant.status === 0:
                return res.status(401).json({
                    error: true,
                    message: "Merchant account is pending trade authorization"
                });
            break;

            case merchant.status === 2:
                return res.status(401).json({
                    error: true,
                    message: "Merchant account has been suspended"
                });
            break;    
        }
    
        return res.status(200).json({
            error: false,
            details: {
                name: merchant.name,
                email: merchant.email,
                phone: merchant.phone,
                state: merchant.state,
                country: merchant.country,
                description: merchant.description,
                other_info: merchant.extra,
                merchant_key: merchant.merchant_key
            },
            message: "Successfully retrieved merchant details"
        });
      });

    }


exports.getMerchantImage = (req, res) => {

}