# Product API – GraphQL Example

![GraphQL](https://img.shields.io/badge/API-GraphQL-blueviolet)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?logo=typescript)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js)

This is a sample API project built with [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [GraphQL](https://graphql.org/).
It provides a simple `products` API for querying and exploring a product catalog using GraphQL.


## Features

* **GraphQL API** for products (query all, query by ID)
* Built with Apollo Server
* Sample product data in memory, including:
   * 30-day `historicalPrices` field on each product for realistic time series testing
* Ready to use with Apollo Studio, GraphQL Playground, or similar tools

## Data Structure

Each product includes standard metadata (id, title, brand, price, etc.) and a `historicalPrices` field containing 30 daily `{ date, price }` points with randomized variations.

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

## 🧪 Testing

This project uses **Jest** and **ts-jest** for unit and integration testing, with test coverage enforced at the project level.

### Running Tests

Install all dependencies (including dev dependencies):

```bash
yarn install
# or
npm install
```

Run the test suite:

```bash
yarn test
# or
npm test
```

### Test Coverage

To check test coverage and see a detailed report:

```bash
yarn test:coverage
# or
npm run test:coverage
```

The coverage report will be displayed in your terminal and saved to the `coverage/` directory (including HTML format).

> **Note:**  
> This project maintains high coverage for statements, functions, and lines (80%+), with a slightly lower threshold for branches (55%+) due to some non-critical server and configuration code that is difficult to test.

### Coverage Thresholds

Enforced in `jest.config.js`:
- **Statements:** 80%
- **Lines:** 80%
- **Functions:** 75%
- **Branches:** 55%

You can adjust these thresholds to be stricter or more lenient as your project requirements evolve.

### Test Locations

All test files are located in `src/__tests__/` and follow the pattern `*.test.ts`.

### How to Interpret Results

- **PASS** means all tests in a suite ran successfully.
- **FAIL** indicates one or more tests need attention.
- Coverage metrics (`statements`, `branches`, etc.) help track the health of your codebase.
- For coverage details, see the output in your terminal or open `coverage/lcov-report/index.html` in your browser.

---

## License

MIT
