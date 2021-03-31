const { ApolloServer } = require(('apollo-server'));
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

const typeDefs = gql`
    type Query {
        sayHi: String!, 
        test: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!',
        test: () => 'Testing'
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then (() => {
        console.log("Connected Successfuly");
        return server.listen({ port: 5000})
    })
    .then ((res) => {
        console.log(`Server running at ${res.url}`);
    })
