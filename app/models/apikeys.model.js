const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    name: String,
    app_id: String,
    environment: String,
    status: String,
    life_span: String,
    extra: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('api_keys', ApiSchema);