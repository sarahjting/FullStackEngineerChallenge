exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.uuid('id').primary();
      table.string('name', 255).notNullable();
      table.boolean('is_admin');
    })
    .createTable('performance_reviews', function(table) {
      table.uuid('id').primary();
      table.uuid('user_id').references('users.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('performance_review_feedbacks', function(table) {
      table.uuid('review_id').references('performance_reviews.id');
      table.uuid('user_id').references('users.id');
      table
        .text('feedback')
        .nullable()
        .default(null);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('performance_review_feedbacks')
    .dropTable('performance_reviews')
    .dropTable('users');
};
