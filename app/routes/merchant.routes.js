module.exports = (app) => {
    const merchants = require('../controllers/merchant.controller.js');
    const auth = require('../controllers/authentication.controller.js');

    // Get list of merchant
    app.get('/all', merchants.getAll);

    // Create new merchant
    app.post('/merchant/create', merchants.registerNew);

    // Retrieve a single merchant
    app.get('/giftified/:token', merchants.getByMerchantToken);

    app.post('/merchant/auth/tokenizer', auth.createAppToken);

}