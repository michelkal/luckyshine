// created by Michel Kalavanda at 20210118 22:07.
// 
// michelkalavanda@gmail.com
// +2348109916000

exports.up = async function(knex, Promise) {
    await knex.schema.createTable("treasures", table => {
        table
        .increments("id")
        .unsigned()
        .primary();
  
        table.string("latitude", 50).notNullable();
        table.string("longitude", 50).notNullable();
        table.string("name").notNullable();
    })
  };
  
  exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("treasures");
  };