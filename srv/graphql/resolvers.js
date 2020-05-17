module.exports = (knex) => ({
  User: {
    isAdmin: (obj) => obj.is_admin,
  },
  PerformanceReview: {
    createdAt: (obj) => obj.created_at,
    user: (obj) =>
      knex('users')
        .where('id', obj.user_id)
        .first(),
    feedbacks: (obj) =>
      knex('performance_review_feedbacks').where('review_id', obj.id),
  },
  PerformanceReviewFeedback: {
    createdAt: (obj) => obj.created_at,
    user: (obj) =>
      knex('users')
        .where('id', obj.user_id)
        .first(),
  },
  Query: {
    user: (_, args) =>
      knex('users')
        .where('name', args.name)
        .first(),
    users: () => knex('users'),
    performanceReviews: () => knex('performance_reviews'),
    pendingPerformanceReviews: (_, args) =>
      knex('performance_reviews')
        .select('performance_reviews.*')
        .join(
          'performance_review_feedbacks',
          'performance_reviews.id',
          '=',
          'performance_review_feedbacks.review_id'
        )
        .where('performance_review_feedbacks.user_id', args.userId)
        .whereNull('performance_review_feedbacks.feedback'),
  },
  Mutation: {
    submitPerformanceReviewFeedback: (_, args) =>
      knex('performance_review_feedbacks')
        .where('review_id', args.performanceReviewId)
        .where('user_id', args.userId)
        .limit(1)
        .update({
          feedback: args.feedback,
        })
        .then(() => true),
  },
});
