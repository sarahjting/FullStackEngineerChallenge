const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const PORT = 3000;

const app = express();
app.use(express.static(`${__dirname}/../public`));
apolloServer.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`Front: http://localhost:${PORT}`);
  console.log(`Back: http://localhost:${PORT}/graphql`);
});
