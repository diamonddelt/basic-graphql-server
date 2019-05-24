// middleware
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    makeExecutableSchema
} = require('graphql-tools');

// used for easy routing of executableSchema above
const {
    graphqlExpress
} = require('apollo-server-express');
const {
    graphiqlExpress
} = require('apollo-server-express');

const express = require('express');
const port = 9000;

// graphQL schema definition language
// AKA "what the client can ask for / how each request is handled"
const typeDefs = `
    type Query {
        greeting: String
    }
`;

// retrieve the data from graphQL
// AKA "ask/query graphQL server for some data"
const resolvers = {
    Query: {
        greeting: () => 'Hello World!'
    }
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();
app.use(cors(), bodyParser.json());

// route for seeing basic graphQL API response
app.use('/graphql', graphqlExpress({
    schema
}));

// route for using graphIQL interactive browser (like the Swagger API Explorer)
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));
app.listen(port, () => console.log(`Server is running on port ${port}`));