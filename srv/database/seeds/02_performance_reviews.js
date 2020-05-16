exports.seed = async function(knex) {
  const users = await knex('users').where('is_admin', false);

  // mysql doesn't support returning()???
  await knex('performance_reviews').insert(
    users.map((user) => ({
      id: knex.raw('UUID()'),
      user_id: user.id,
    }))
  );

  const performanceReviews = await knex('performance_reviews');
  await Promise.all(
    performanceReviews.map((review) =>
      knex('performance_review_feedbacks').insert(
        users
          .filter((user) => user.id !== review.user_id)
          .map((user, i) => ({
            review_id: review.id,
            user_id: user.id,
            feedback: i === 0 ? 'Foo' : null,
          }))
      )
    )
  );
};
