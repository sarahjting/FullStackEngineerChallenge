require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');

const knex = require('knex')(require('./knexfile'));

const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')(knex);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const app = express();

app.use(express.static(`${__dirname}/../dist`));

app.use('/graphql', bodyParser.json());
apolloServer.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () => {
  console.log(`Front: ${process.env.APP_URL}:${process.env.PORT}`);
  console.log(`Back: ${process.env.APP_URL}:${process.env.PORT}/graphql`);
});
