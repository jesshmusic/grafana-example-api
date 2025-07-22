# Product API – GraphQL Example

This is a sample API project built with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [GraphQL](https://graphql.org/).
It provides a simple `products` API for querying and exploring a product catalog using GraphQL.

## Features

* **GraphQL API** for products (query all, query by ID)
* Built with Apollo Server
* Sample product data in memory
* Ready to use with Apollo Studio, GraphQL Playground, or similar tools

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/product-api-graphql-example.git
   cd product-api-graphql-example
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the server**

   ```bash
   npm start
   # or
   yarn start
   ```

The server will start on [http://localhost:8081/](http://localhost:8081/)

### Usage

Once running, you can open the Apollo Studio sandbox or any GraphQL Playground at [http://localhost:8081/](http://localhost:8081/) to interact with the API.

#### Example GraphQL Query

```graphql
query {
  products {
    id
    title
    price
    category
  }
}
```

#### Example Response

```json
{
  "data": {
    "products": [
      {
        "id": 1,
        "title": "Test Product",
        "price": 99.99,
        "category": "TestCategory"
      }
    ]
  }
}
```

## Scripts

* `npm start` – Start the server
* `npm run dev` – Start with nodemon for development (if configured)

## Project Structure

* `index.js` or `server.js` – Main entry point
* `products.js` – Product data
* `schema.js` – GraphQL schema (if separated)

## License

MIT

---

### Repo Topics/Tags

Make sure to add `graphql`, `apollo-server`, and `api` to your GitHub repository topics for discoverability.
