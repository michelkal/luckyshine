// created by Michel Kalavanda at 20210117 01:27.
// 
// michelkalavanda@gmail.com
// +2348109916000

module.exports = (app) => {
const User = require('../../app/controllers/users.controller.js');
app.post('/luckyshine/access', User.authUser);

}