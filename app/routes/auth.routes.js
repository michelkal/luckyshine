module.exports = (app) => {
    const authModule = require('../controllers/authentication.controller.js');

    app.post('/identify/create', authModule.identificationSTart);
}