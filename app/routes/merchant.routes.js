module.exports = (app) => {
    const merchants = require('../controllers/merchant.controller');
    const auth = require('../controllers/authentication.controller');
    const fileController = require('../controllers/fileupload.controller');

    // Get list of merchant
    app.get('/all', merchants.getAll);

    // Create new merchant
    app.post('/merchant/create', merchants.registerNew);

    // Retrieve a single merchant
    app.get('/giftified/:token', merchants.getByMerchantToken);

    app.post('/merchant/auth/tokenizer', auth.createAppToken);

    app.post('/merchant/updt/file', fileController.saveMerchantMedia);

    app.get('/merchant/get-merchant', merchants.getSingleMerchant);

    app.get('/merchant/:fileId', merchants.getMerchantImage);

}