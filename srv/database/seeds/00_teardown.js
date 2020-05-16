exports.seed = function(knex) {
  const tables = [
    'users',
    'performance_reviews',
    'performance_review_feedbacks',
  ];
  return knex
    .raw('SET FOREIGN_KEY_CHECKS=0')
    .then(() => knex.raw(`DELETE ${tables.join(',')} FROM ${tables.join(',')}`))
    .then(() => knex.raw('SET FOREIGN_KEY_CHECKS=1'));
};
