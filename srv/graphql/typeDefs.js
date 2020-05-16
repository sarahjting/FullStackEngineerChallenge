const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type User {
    id: String
    name: String
    isAdmin: Boolean
  }
  type PerformanceReview {
    id: String
    user: User
    feedbacks: [PerformanceReviewFeedback]
    createdAt: String
  }
  type PerformanceReviewFeedback {
    user: User
    performanceReview: PerformanceReview
    feedback: String
    createdAt: String
  }
  type Query {
    user(name: String): User
    performanceReviews: [PerformanceReview]
    pendingPerformanceReviews(userId: String): [PerformanceReview]
  }
  type Mutation {
    submitPerformanceReviewFeedback(
      userId: String
      performanceReviewId: String
      feedback: String
    ): Boolean
  }
`;
