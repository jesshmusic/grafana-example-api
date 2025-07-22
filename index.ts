import { ApolloServer, gql } from 'apollo-server';
import { products } from './products';

const typeDefs = gql`
    type Product {
        id: Int!
        title: String!
        description: String!
        price: Float!
        discountPercentage: Float!
        rating: Float!
        stock: Int!
        brand: String!
        category: String!
        thumbnail: String!
        images: [String!]!
    }

    type Query {
        products: [Product!]!
        product(id: Int!): Product
    }
`;

const resolvers = {
  Query: {
    products: () => products,
    product: (_: any, args: { id: number }) => products.find(p => p.id === args.id),
  },
};

const port = process.env.PORT || 8081;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
