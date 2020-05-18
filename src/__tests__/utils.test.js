import utils from '../utils';

// Most of the graphQL testing is done in graphql.test.js
// This is just checking that utils.js isn't throwing obvious errors
describe.only('utils', () => {
  it('can retrieve all users', async () => {
    const users = await utils.users();
    expect(Array.isArray(users)).toBeTruthy();
  });

  it('can retrieve a user', async () => {
    const user = await utils.user('Admin');
    expect(typeof user).toBe('object');
  });

  it('can list all performance reviews', async () => {
    const performanceReviews = await utils.performanceReviews();
    expect(Array.isArray(performanceReviews)).toBeTruthy();
  });

  it('can list pending performance reviews', async () => {
    const user = await utils.user('User 5');
    const performanceReviews = await utils.pendingPerformanceReviews(user);
    expect(Array.isArray(performanceReviews)).toBeTruthy();
  });

  it('can submit feedback to a performance review', async () => {
    const user = await utils.user('User 5');
    const performanceReviews = await utils.pendingPerformanceReviews(user);
    const result = await utils.submitPerformanceReviewFeedback({
      performanceReview: performanceReviews[0],
      user: user,
      feedback: 'Foo',
    });
    expect(typeof result).toBe('boolean');
  });

  it('can create performance review', async () => {
    const user = await utils.user('User 5');
    const feedbackUsers = await utils.users();
    const performanceReview = await utils.createPerformanceReview({
      user,
      feedbackUsers,
    });
    expect(typeof performanceReview).toBe('object');
    expect(performanceReview).toBeTruthy();
  });
});
