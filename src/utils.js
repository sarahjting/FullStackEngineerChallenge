import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.APP_URL
  ? process.env.APP_URL + ':' + process.env.PORT
  : '';

const gql = function(query, variables = {}) {
  return axios
    .post(`${baseUrl}/graphql`, { query, variables })
    .then((data) => data.data.data)
    .catch((e) => {
      if (e.response) {
        console.log(
          `Error in GQL:\n ${query}\n`,
          e.response.data.errors.map((x) => x.message)
        );
      } else {
        throw e;
      }
    });
};

export default {
  user: function(name) {
    return gql('query($name:String) { user(name:$name) { id name isAdmin }}', {
      name,
    }).then((x) => x.user);
  },
  users: function() {
    return gql('query{ users { id name isAdmin }}', {
      name,
    }).then((x) => x.users);
  },
  performanceReviews: function() {
    return gql(
      'query{ performanceReviews { id createdAt user { name } feedbacks { user { name } feedback createdAt } }}'
    ).then((x) => x.performanceReviews);
  },
  pendingPerformanceReviews: function(user) {
    return gql(
      'query($userId: String) { pendingPerformanceReviews(userId: $userId) { id createdAt user { name } }}',
      { userId: user.id }
    ).then((x) => x.pendingPerformanceReviews);
  },
  submitPerformanceReviewFeedback: function(params) {
    const { user, performanceReview, feedback } = params;
    return gql(
      `mutation($userId: String, $performanceReviewId: String, $feedback: String){ 
          submitPerformanceReviewFeedback(userId: $userId, performanceReviewId: $performanceReviewId, feedback: $feedback) 
        }`,
      {
        userId: user.id,
        performanceReviewId: performanceReview.id,
        feedback,
      }
    ).then((x) => x.submitPerformanceReviewFeedback);
  },
  createPerformanceReview: function(params) {
    const { user, feedbackUsers } = params;
    return gql(
      `mutation($userId: String, $feedbackUserIds: [String]){ 
        createPerformanceReview(userId: $userId, feedbackUserIds: $feedbackUserIds) { 
          id createdAt user { name } feedbacks { user { name } feedback createdAt } 
        }
      }`,
      {
        userId: user.id,
        feedbackUserIds: feedbackUsers.map((x) => x.id),
      }
    ).then((x) => x.createPerformanceReview);
  },
};
