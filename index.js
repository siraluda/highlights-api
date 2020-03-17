

// This will typically be data that we're retrieving and writing to from a database

let highlights = [
    {
        id: '1',
        content: 'One day i will find the right words, and they will be simple',
        title: 'Dharma Bums',
        author: 'Jack Kerouac'
    },
    {
        id: '2',
        content: 'In the limits of a situation there is humor, there is grace, and everything else',
        title: 'Arbitrary Stupid Goal',
        author: 'Thomas Shelby'
    }
]


// Resolvers allows the API to interact with the data by querying and mutating it
const resolvers = {

    Query: {

        highlights: () => highlights,
        highlight: (parent, args) => {     // args parameter allows us to access the user provided arguments. i.e users of the API will supply an id argument                            
            return highlights.find(highlight => highlight.id === args.id); // parent is the first parameter of any graphql query
        }                                                                  
    },

    Mutation: {

        newHighlight: (parent, args) => {
            const highlight = {
                id: String(highlights.length + 1),
                title: args.title || '',
                author: args.author || '',
                content: args.content
            };
            highlights.push(highlight);
            return highlight;
        },

        updateHighlight: (parent, args) => {

            const index = highlights.findIndex(highlight => highlight.id === args.id); // find the index of the highlight to be updated
            const highlight = {
                id: args.id,
                content: args.content,
                author: highlights[index].author,
                title: highlights[index].title
            };
            highlights[index] = highlight;
            return highlight;
        },

        deleteHighlight: (parent, args) => {

            const deletedHighlight = highlights.find(
                highlight => highlight.id === args.id
            );
            highlights = highlights.filter(highlight => highlight.id !== args.id);
            return deletedHighlight;
        }
    }
};


//INITIALIZATION

const { ApolloServer } = require('apollo-server');          // importing the ApolloServer
const typeDefs = require('./schema');                       // importing the schema type definitions 

const server = new ApolloServer({ typeDefs, resolvers });   // Apolloserver takes in the schema and resolvers

server.listen().then(({ url }) => {
    console.log(`Highlights server ready at ${url}`);
});