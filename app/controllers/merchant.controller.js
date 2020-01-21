const Merchant = require('../models/merchant.model.js');
const { check, validationResult } = require('express-validator')

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

    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            error: true,
            message: errors.array() 
        })
      }

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
        extra: req.body.extra

    });

    createMerchant.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while creating merchant. Try again later."
        });
    });

}];

exports.getByMerchantToken = (req, res) => {

};