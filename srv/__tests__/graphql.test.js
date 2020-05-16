require('dotenv').config();
const axios = require('axios');
const knex = require('knex')(require('../knexfile.js'));

function gql(query, variables = {}) {
  return axios
    .post(`http://localhost:${process.env.PORT}/graphql`, {
      query,
      variables,
    })
    .then((data) => data.data.data)
    .catch((e) =>
      console.log(
        `Error in GQL:\n ${query}\n`,
        e.response.data.errors.map((x) => x.message)
      )
    );
}

describe('graphql', () => {
  let users, feedbacks, performanceReviews;

  beforeAll(async () => {
    users = await knex('users');
    performanceReviews = await knex('performance_reviews');
    feedbacks = await knex('performance_review_feedbacks');
  });

  describe('users', () => {
    it('can retrieve a user from the database', async () => {
      const result = await gql(
        `query{ user(name:'Admin') { id name isAdmin }}`
      );
      expect(typeof result).toBe('array');
      expect(typeof result.user).toBe('array');
      expect(typeof result.user.id).toBe('string');
      expect(typeof result.user.isAdmin).toBe('boolean');
      expect(result.user.name).toBe('Admin');
    });
  });

  describe('performance reviews', () => {
    let user, userPendingFeedbacks, performanceReview;

    beforeAll(async () => {
      user = users[2];
      userPendingFeedbacks = feedbacks.filter(
        (x) => x.feedback === null && x.user_id === user.id
      );
      [performanceReview] = performanceReviews.filter(
        (x) => x.id === userPendingFeedbacks[0].review_id
      );
    });

    it('can list all performance reviews', async () => {
      const result = await gql(
        `query{ performanceReviews { createdAt user { name } feedbacks { user { name } feedback } }}`
      );
      expect(typeof result).toBe('array');
      expect(typeof result.performanceReviews).toBe('array');
    });

    it('can list pending performance reviews', async () => {
      const result = await gql(
        `query{ pendingPerformanceReviews(userId: "${user.id}") { createdAt user { name } }}`
      );
      expect(typeof result).toBe('array');
      expect(typeof result.pendingPerformanceReviews).toBe('array');
      expect(result.pendingPerformanceReviews.length).toBe(
        userPendingFeedbacks.length
      );
    });

    it('can submit feedback to a performance review', async () => {
      const result = await gql(
        `query{ submitPerformanceReviewFeedback(userId: "${user.id}", performanceReviewId: "${performanceReview.id}", feedback: "Foo") }`
      );
      expect(typeof result).toBe('array');
      expect(typeof result.submitPerformanceReviewFeedback).toBe(true);

      const databaseCheck = await knex('performance_review_feedbacks')
        .where('user_id', user.id)
        .where('review_id', performanceReview.id)
        .first();
      expect(databaseCheck.feedback).toBe('Foo');
    });
  });
});
