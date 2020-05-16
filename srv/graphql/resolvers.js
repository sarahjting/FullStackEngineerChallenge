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
        }),
  },
});
