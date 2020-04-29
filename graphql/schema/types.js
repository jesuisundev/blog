const path = require("path");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const abilitiesType = new GraphQLObjectType({
  name: "ability",
  fields: {
    name: {
      type: GraphQLString,
      resolve: parent => parent.name
    },
    damage: {
      type: GraphQLString,
      resolve: parent => parent.damage
    },
    accuracy: {
      type: GraphQLString,
      resolve: parent => parent.accuracy
    },
    mana: {
      type: GraphQLString,
      resolve: parent => parent.mana
    },
    type: {
      type: GraphQLString,
      resolve: parent => parent.type
    }
  }
});

const pokemonsType = new GraphQLObjectType({
  name: "pokemons",
  fields: {
    name: {
      type: GraphQLString,
      resolve: parent => parent.name
    },
    abilities: {
      type: new GraphQLList(abilitiesType),
      resolve(parent) {
        const abilities = require(path.resolve("data/abilities.json"));

        return abilities.filter(ability =>
          ability.linkedTo.includes(parent.name)
        );
      }
    }
  }
});

exports.pokemonsType = pokemonsType;
