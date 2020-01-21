const mongoose = require('mongoose');

const MerchantSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    country: String,
    state: String,
    address: String,
    description: String,
    category: String,
    extra: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Merchant', MerchantSchema);