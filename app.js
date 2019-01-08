const { ApolloServer, gql } = require('apollo-server');
const moment = require('moment');                   // For time formating

/**
 * This simulate a storage but you can use whatever you want
 */
let storage = {};
storage.word = 'pistachio';
storage.author = 'amadeous';

/**
 * This is where you define the various querys and mutations
 * You must also describe the input and output types if more complex than String, Float, Boolean, Int,...
 * Thing is a defined type. You can then in resolver, change its attributes and add some if you want
 */
const typeDefs = gql`
    type Query {
        message: String
        retrieve: Thing
    }
    type Mutation {
        store(word: String!, author: String!): Thing
    }
    type Thing {
        word: String!
        author: String!
        now: String!
    }
`;

/**
 * Here you define what to do when a query or mutation is recieved
 * p is something i dunno
 * a is the arguments you recieve
 */
const resolvers = {
    Query: {
        message: () => 'hello world',
        retrieve: () => storage,
    },
    Mutation: {
        store: (p, a) => { storage = a; return storage },
    },
    Thing: {
        now: () => moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});