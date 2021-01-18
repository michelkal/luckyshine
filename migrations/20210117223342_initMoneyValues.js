// created by Michel Kalavanda at 20210112 23:34.
// 
// michelkalavanda@gmail.com
// +2348109916000

exports.up = async function(knex, Promise) {
    await knex.schema.createTable("money_values", table => {
        table.integer("treasure_id").notNullable();
        table.integer("amt").notNullable();
    })
  };
  
  exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("money_values");
  };