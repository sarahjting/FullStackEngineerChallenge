module.exports = (knex) => ({
  User: {
    isAdmin: (obj) => obj.is_admin,
  },
  Query: {
    user: (_, args) => knex('users').where('name', args.name).first(),
  },
});
