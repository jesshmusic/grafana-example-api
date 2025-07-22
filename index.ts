import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server-core';
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

const start = async () => {
  const app = express();

  // ✅ Health check route for EB
  app.get('/', (_, res) => res.send('OK'));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT;
  if (!port) throw new Error("PORT must be set");

  app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

start();
