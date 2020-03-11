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

exports.saveMerchantMedia = [
    check('file').isEmpty().withMessage('File cannot be empty'),

    (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        log.warn('FILE UPLOAD VALIDATION ERROR', errors);

        return res.status(400).json({ 
            errors: true, 
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

        log.info('Decode TOKEN On Merchant File Upload', decoded, new Date().toJSON());
    });
    
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './uploads');
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({storage: storage}).any('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        let results = req.files.map((file) => {
            return {
                mediaName: file.filename,
                origMediaName: file.originalname,
                mediaSource: 'http://' + req.headers.host + '/uploads/' + file.filename
            }
        });
        res.status(200).json(results);
    });
}
];