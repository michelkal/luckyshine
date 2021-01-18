// created by Michel Kalavanda at 20210118 09:39.
// 
// michelkalavanda@gmail.com
// +2348109916000

module.exports = (app) => {
    const Treasure = require('../controllers/treasure.controller');
    
    app.post('/api/v1/treasure-search', Treasure.treasureSearch);
    app.post('/api/v1/treasure/money-value', Treasure.treasureSearchMoneyValue);
    }

