// Import the graphql library
const { gql } = require('apollo-server');

const typeDefs = gql`

    # The schema will go here

    # Data representation of our object
    type Highlight {

        id: ID!                 # Exclamations mean that the fields are required
        content: String!
        title: String
        author: String
    }

    # Data interaction
    type Query {

        highlights: [Highlight]!        # querying all the highlights
        highlight(id: ID!): Highlight   # querying a single highlight
    }

    type Mutation {

        newHighlight(content: String! title: String author: String): Highlight!  # creating a new highlight 
        updateHighlight(id: ID! content: String!): Highlight!                    # updating a highlight
        deleteHighlight(id: ID!): Highlight!                                     # deleting a highlight
    }

`;

module.exports = typeDefs;
