// created by Michel Kalavanda at 20210117 22:49.
// 
// michelkalavanda@gmail.com
// +2348109916000

const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 3000, name: 'U1', age: 21, password: bcrypt.hashSync('luckyshine001', 8), email: 'u1@luckyshine.xyz'},
        {id: 3001, name: 'U2', age: 51, password: bcrypt.hashSync('luckyshine002', 8), email: 'u2@luckyshine.xyz'},
        {id: 3002, name: 'U3', age: 31, password: bcrypt.hashSync('luckyshine003', 8), email: 'u1@luckyshine.xyz'},
        {id: 3003, name: 'U4', age: 18, password: bcrypt.hashSync('luckyshine004', 8), email: 'u2@luckyshine.xyz'},
        {id: 3004, name: 'U5', age: 21, password: bcrypt.hashSync('luckyshine005', 8), email: 'u1@luckyshine.xyz'},
        {id: 3005, name: 'U6', age: 35, password: bcrypt.hashSync('luckyshine006', 8), email: 'u2@luckyshine.xyz'}
      ]);
    });
};
