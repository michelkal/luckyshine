module.exports = (app) => {
const User = require('../../app/controllers/users.controller.js');

app.post('/giftify/create', User.createNewUser);
app.post('/gitify/access', User.authUser);

}