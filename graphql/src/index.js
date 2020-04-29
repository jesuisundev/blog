const path = require("path");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const graphql = require("graphql");
const { query } = require(path.resolve("schema/query"));
const graphQLSchema = new graphql.GraphQLSchema({ query });

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true
  })
);

app.listen(8080);
