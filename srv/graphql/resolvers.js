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
    createPerformanceReview: async (_, args) => {
      await knex('performance_reviews').insert({
        id: knex.raw('UUID()'),
        user_id: args.userId,
      });

      // unfortunately MySQL does not support returning
      // in the future i'll make sure to give MySQL tables an AI column just for easier insertion handling
      // (or just use PostgreSQL)
      const performanceReview = await knex('performance_reviews')
        .where('user_id', args.userId)
        .orderBy('created_at', 'DESC')
        .first();

      await knex('performance_review_feedbacks').insert(
        args.feedbackUserIds.map((user) => ({
          review_id: performanceReview.id,
          user_id: user.id,
          feedback: null,
        }))
      );

      return performanceReview;
    },
  },
});
