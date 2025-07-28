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

const originalProducts = products.map(p => ({ ...p }));

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

    input CreateProductInput {
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

    input UpdateProductInput {
        title: String
        description: String
        price: Float
        discountPercentage: Float
        rating: Float
        stock: Int
        brand: String
        category: String
        thumbnail: String
        images: [String!]
    }

    type Query {
        products(limit: Int): [Product!]!
        product(id: Int!): Product
    }

    type Mutation {
        createProduct(input: CreateProductInput!): Product!
        updateProduct(id: Int!, input: UpdateProductInput!): Product
        deleteProduct(id: Int!): Boolean!
        resetProducts: [Product!]!
    }
`;

const resolvers = {
  Query: {
    products: (_: any, args: { limit?: number }) => {
      const result = products.map(p => ({
        ...p,
        historicalPrices: generatePriceHistory(p.price),
      }));
      return args.limit ? result.slice(0, args.limit) : result;
    },
    product: (_: any, { id }: { id: number }) => {
      const found = products.find(p => p.id === id);
      if (!found) return null;
      return {
        ...found,
        historicalPrices: generatePriceHistory(found.price),
      };
    },
  },

  Mutation: {
    createProduct: (
      _: any,
      { input }: { input: Omit<typeof products[number], 'id'> }
    ) => {
      const nextId = products.length
        ? Math.max(...products.map(p => p.id)) + 1
        : 1;
      const newProduct = { id: nextId, ...input };
      products.push(newProduct);
      return {
        ...newProduct,
        historicalPrices: generatePriceHistory(newProduct.price),
      };
    },

    updateProduct: (
      _: any,
      {
        id,
        input,
      }: { id: number; input: Partial<Omit<typeof products[number], 'id'>> }
    ) => {
      const idx = products.findIndex(p => p.id === id);
      if (idx === -1) {
        throw new Error(`Product with id ${id} not found`);
      }
      products[idx] = { ...products[idx], ...input };
      const updated = products[idx];
      return {
        ...updated,
        historicalPrices: generatePriceHistory(updated.price),
      };
    },

    deleteProduct: (_: any, { id }: { id: number }) => {
      const idx = products.findIndex(p => p.id === id);
      if (idx === -1) {
        return false;
      }
      products.splice(idx, 1);
      return true;
    },

    resetProducts: () => {
      // clear any runtime mutations
      products.length = 0;
      // restore original hard‑coded data
      originalProducts.forEach(p => products.push({ ...p }));
      // return with fresh history
      return products.map(p => ({
        ...p,
        historicalPrices: generatePriceHistory(p.price),
      }));
    },
  },
};

const startServer = async (testMode = false) => {
  const app = express();
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://grafana-example-api.existentialmusic.com',
        'https://grafana-example-frontend.s3.us-east-1.amazonaws.com',
      ],
    })
  );

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

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
