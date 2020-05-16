require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

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
  console.log(`Front: http://localhost:${process.env.PORT}`);
  console.log(`Back: http://localhost:${process.env.PORT}/graphql`);
});
