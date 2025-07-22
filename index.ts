import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server-core';
import { products } from './products';
import cors from 'cors';

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

const startServer = async () => {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://grafana-example-api.existentialmusic.com',
      'https://grafana-example-frontend.s3.amazonaws.com',
    ],
    credentials: true,
  }));

  app.get('/', (_, res) => res.send('OK'));

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const port: number = parseInt(process.env.PORT || '8081', 10);

  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  });


};

startServer();
