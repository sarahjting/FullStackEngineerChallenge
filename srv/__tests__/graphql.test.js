require('dotenv').config();
const axios = require('axios');

const PORT = 3000;
function gql(query, variables = {}) {
  return axios
    .post(`http://localhost:${process.env.PORT}/graphql`, {
      query,
      variables,
    })
    .then((data) => data.data.data);
}

test('sample', async () => {
  expect(await gql('query{foo}')).toStrictEqual({ foo: 'bar' });
});
