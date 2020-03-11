const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true

    },
    password: {
        type: String,
        select: false
    },
    phone: {
        type: String,
        unique: true
    },
    country: String,
    state: String,
    address: String,
    status: String,
    activation_key: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);