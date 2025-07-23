import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server-core';
import { products } from './products';
import cors from 'cors';

// Generate a 30-day price history for a product
function generatePriceHistory(basePrice: number, days: number = 30) {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    // Simulate ±5% random price change
    const price = Math.round((basePrice * (1 + (Math.random() - 0.5) * 0.1)) * 100) / 100;
    result.push({
      date: date.toISOString(),
      price,
    });
  }
  return result;
}

const typeDefs = gql`
    type PricePoint {
        date: String!
        price: Float!
    }

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
        historicalPrices: [PricePoint!]!
    }

    type Query {
        products: [Product!]!
        product(id: Int!): Product
    }
`;


const resolvers = {
  Query: {
    products: () =>
      products.map(p => ({
        ...p,
        historicalPrices: generatePriceHistory(p.price),
      })),
    product: (_: any, args: { id: number }) => {
      const found = products.find(p => p.id === args.id);
      if (!found) return null;
      return {
        ...found,
        historicalPrices: generatePriceHistory(found.price),
      };
    },
  },
};

const startServer = async (testMode = false) => {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:3000',
      'https://grafana-example-api.existentialmusic.com',
      'https://grafana-example-frontend.s3.us-east-1.amazonaws.com',
      'https://studio.apollographql.com',
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
  if (!testMode) {
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server ready at http://localhost:8081/graphql`);
    });
  }
  return app;
};

export { generatePriceHistory, resolvers, startServer };

if (require.main === module) {
  startServer();
}

