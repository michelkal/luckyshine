const mongoose = require('mongoose');

const MerchantSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    country: String,
    state: String,
    address: String,
    description: String,
    category: String,
    extra: String,
    merchant_key: String,
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Merchant', MerchantSchema);