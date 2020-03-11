const mongoose = require('mongoose');

const ApiSchema = mongoose.Schema({
    name:  {
        type: String,
        unique: true
    },
    app_id:  {
        type: String,
        unique: true
    },
    environment: String,
    status: String,
    life_span: String,
    extra: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('api_keys', ApiSchema);