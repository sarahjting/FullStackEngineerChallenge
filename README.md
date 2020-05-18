# Full Stack Developer Challenge

PayPay challenge.

## Implemented functionality

- Admin functionality:
  - Admins can view a list of all performance reviews.
  - Admins can view a performance review for an employee, and feedback submitted by all assigned employees.
  - Admins can create a new performance review for an employee, and assign other employees to submit feedback for that review.
- Employee functionality:
  - Employees can view a list of all performance reviews that still require their feedback.
  - Employees can submit a feedback for a performance review.

## Implementation

- Front end: Vue, Vue Router, Vuex, Vue Bootstrap
- Back end: Node, Express, Apollo
- Testing: Jest

## Usage

- Install dependencies using `npm i`
- `cp .env.default .env` and fill in `.env` with your port and database settings
- Migrate and seed database using `npm run db:migrate && npm run db:seed`
- Build assets using `npm run build`
- Put up server using `npm run start`
- By default this will be up at `http://localhost:3000`
- Log in with "Admin" or "User 1".
- Test using `npm run test`

## Assumptions made

### Challenge scope assumptions

- I’ve assumed security and authentication is outside of the scope of this test; currently the server accepts all requests without checking if the user is authorized or the validity of the data. In a real production environment, we'd need authentication, data validation and proper error handling.
- I’ve assumed performance is outside of the scope of this test; in a production environment, some sort of batching functionality (eg. DataLoader) would be required to make GraphQL feasible. Would also not load the entire database into memory for testing or for forms (lol).
- Since the scope of the test is quite small I opted to just put all the GraphQL business logic in the resolver file. Normally I’d split this out into a model or service layer for legibility.

### Business assumptions

- The only details stored about employees are their name.
- The only details stored about performance reviews is date created, and feedback of that employee’s peers.
- Administators can create an unlimited number of performance reviews per employee, and assign an unlimited number of peers to those performance reports to provide feedback.
- Peers are assigned by the administrator at the time the review is created.
- Administrators (and only administrators) can view all performance reports.
- Once an employee has submitted feedback to a performance report, the performance report is removed from their dashboard. Employees are unable to view performance report information or history.
