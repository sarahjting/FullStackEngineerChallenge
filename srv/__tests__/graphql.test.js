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
    it('can retrieve all users', async () => {
      const result = await gql(`query{ users { id name isAdmin }}`);
      expect(typeof result).toBe('object');
      expect(Array.isArray(result.users)).toBeTruthy();
      expect(result.users.length).toBe(users.length);
      expect(typeof result.users[0]).toBe('object');
      expect(typeof result.users[0].id).toBe('string');
      expect(typeof result.users[0].name).toBe('string');
      expect(typeof result.users[0].isAdmin).toBe('boolean');
    });
    it('can retrieve a user', async () => {
      const result = await gql(
        `query($name:String) { user(name:$name) { id name isAdmin }}`,
        { name: 'Admin' }
      );
      expect(typeof result).toBe('object');
      expect(typeof result.user).toBe('object');
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
        `query{ performanceReviews { id createdAt user { name } feedbacks { user { name } feedback createdAt } }}`
      );
      expect(typeof result).toBe('object');

      const reviews = result.performanceReviews;
      expect(Array.isArray(reviews)).toBeTruthy();
      expect(reviews.length).toBe(performanceReviews.length);

      expect(typeof reviews[0].createdAt).toBe('string');
      expect(typeof reviews[0].user).toBe('object');
      expect(typeof reviews[0].user.name).toBe('string');

      expect(Array.isArray(reviews[0].feedbacks)).toBeTruthy();
      expect(typeof reviews[0].feedbacks[0]).toBe('object');
      expect(typeof reviews[0].feedbacks[0].feedback).toBe('string');
      expect(typeof reviews[0].feedbacks[0].createdAt).toBe('string');
      expect(typeof reviews[0].feedbacks[0].user).toBe('object');
      expect(typeof reviews[0].feedbacks[0].user.name).toBe('string');
    });

    it('can list pending performance reviews', async () => {
      const result = await gql(
        `query($userId: String) { pendingPerformanceReviews(userId: $userId) { id createdAt user { name } }}`,
        { userId: user.id }
      );
      expect(typeof result).toBe('object');
      expect(Array.isArray(result.pendingPerformanceReviews)).toBeTruthy();
      expect(result.pendingPerformanceReviews.length).toBe(
        userPendingFeedbacks.length
      );
    });

    it('can create performance review', async () => {
      const feedbackUserIds = users
        .filter((x) => !x.isAdmin && x.id !== user.id)
        .map((x) => x.id);

      const result = await gql(
        `mutation($userId: String, $feedbackUserIds: [String]){ 
          createPerformanceReview(userId: $userId, feedbackUserIds: $feedbackUserIds) { 
            id createdAt user { name } feedbacks { user { name } feedback createdAt } 
          }
        }`,
        { userId: user.id, feedbackUserIds }
      );
      expect(typeof result).toBe('object');
      expect(typeof result.createPerformanceReview).toBe('object');

      const performanceReview = result.createPerformanceReview;
      expect(typeof performanceReview.id).toBe('string');
      expect(Array.isArray(performanceReview.feedbacks)).toBeTruthy();
      expect(performanceReview.feedbacks.length).toBe(feedbackUserIds.length);
      expect(typeof performanceReview.feedbacks[0]).toBe('object');
      expect(typeof performanceReview.feedbacks[0].user).toBe('object');
      expect(performanceReview.feedbacks[0].feedback).toBeNull();
    });

    it('can submit feedback to a performance review', async () => {
      const result = await gql(
        `mutation($userId: String, $performanceReviewId: String, $feedback: String){ submitPerformanceReviewFeedback(userId: $userId, performanceReviewId: $performanceReviewId, feedback: $feedback) }`,
        {
          userId: user.id,
          performanceReviewId: performanceReview.id,
          feedback: 'Foo',
        }
      );
      expect(typeof result).toBe('object');
      expect(typeof result.submitPerformanceReviewFeedback).toBe('boolean');

      const databaseCheck = await knex('performance_review_feedbacks')
        .where('user_id', user.id)
        .where('review_id', performanceReview.id)
        .first();
      expect(databaseCheck.feedback).toBe('Foo');
    });
  });
});
