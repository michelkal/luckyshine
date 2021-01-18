// created by Michel Kalavanda at 20210117 21:54.
// 
// michelkalavanda@gmail.com
// +2348109916000

exports.up = async function(knex, Promise) {
  await knex.schema.createTable("users", table => {
      table
      .increments("id")
      .unsigned()
      .primary();

      table.string("name", 50).notNullable();
      table.integer("age");
      table.string("email", 100).notNullable();
      table.string("password", 255);
  })
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable("users");
};
