exports.seed = function(knex) {
  const users = [
    { name: 'Admin', is_admin: true },
    { name: 'User 1', is_admin: false },
    { name: 'User 2', is_admin: false },
    { name: 'User 3', is_admin: false },
    { name: 'User 4', is_admin: false },
    { name: 'User 5', is_admin: false },
  ];
  return knex('users').insert(
    users.map((x) => ({
      ...x,
      id: knex.raw('UUID()'),
    }))
  );
};
