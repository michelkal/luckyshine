// created by Michel Kalavanda at 20210117 02:15.
// 
// michelkalavanda@gmail.com
// +2348109916000

const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('treasures').del()
    .then(function () {
      // Inserts seed entries
      return knex('treasures').insert([
        {id: 100, latitude: '1.33125924', longitude: '103.89804864',  name: 'T1'},
        {id: 1001, latitude: '1.3225575', longitude: '103.89430855', name: 'T2'},
        {id: 1002, latitude: '1.3166356', longitude: '103.88912254', name: 'T3'},
        {id: 1003, latitude: '1.31286055', longitude: '103.85455645', name: 'T4'},
        {id: 1004, latitude: '1.34439896', longitude: '103.87659381', name: 'T5'},
        {id: 1005, latitude: '1.33616189', longitude: '103.87708662',  name: 'T6'},
        {id: 1006, latitude: '1.32552844', longitude: '103.86910143',  name: 'T7'},
        {id: 1007, latitude: '1.32303589', longitude: '103.87748154', name: 'T8'},
        {id: 1008, latitude: '1.33465304', longitude: '103.87044897', name: 'T9'},
        {id: 1009, latitude: '1.32606138', longitude: '103.87930069', name: 'T10'},
        {id: 1010, latitude: '1.25886946', longitude: '103.89887904', name: 'T11'},
        {id: 1011, latitude: '1.26973345', longitude: '103.8810448',  name: 'T12'},
        {id: 1012, latitude: '1.32914713', longitude: '103.8334781',  name: 'T13'},
        {id: 1013, latitude: '1.32960595', longitude: '103.88079366', name: 'T14'},
        {id: 1014, latitude: '1.33700251', longitude: '103.84922492', name: 'T15'},
        {id: 1015, latitude: '1.27845714', longitude: '103.85717615', name: 'T16'},
        {id: 1016, latitude: '1.36019784', longitude: '103.85635821', name: 'T17'},
        {id: 1017, latitude: '1.31551921', longitude: '103.8632839',  name: 'T18'}
      ]);
    });
};
