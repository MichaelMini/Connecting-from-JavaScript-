
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function (table) {
    table.increments();
    table.string('description');
    table.date('date_achieved');
    table.integer('famous_person_id').references('id').inTable('famous_people');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
