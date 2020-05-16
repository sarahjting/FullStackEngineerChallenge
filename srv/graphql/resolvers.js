module.exports = (knex) => ({
  User: {
    isAdmin: (obj) => obj.is_admin,
  },
  PerformanceReview: {
    createdAt: (obj) => obj.created_at,
  },
  Query: {
    user: (_, args) => knex('users').where('name', args.name).first(),
    performanceReviews: () => knex('performance_reviews'),
  },
});
