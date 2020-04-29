const path = require("path");
const { GraphQLObjectType, GraphQLList } = require("graphql");
const { pokemonsType } = require(path.resolve("schema/types"));

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    pokemons: {
      type: new GraphQLList(pokemonsType),
      resolve() {
        const data = require(path.resolve("data/pokemons.json"));

        return data;
      }
    }
  }
});

exports.query = RootQuery;
