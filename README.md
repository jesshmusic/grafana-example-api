# Example GraphQL Products API

This is a simple Node.js GraphQL API for a mock product database. It uses Apollo Server and TypeScript, and is designed as an example for frontend testing or prototyping.

## Features

- GraphQL API for fetching a list of products or a single product by ID
- TypeScript for type safety
- Easily extensible mock data in `products.ts`

## Endpoints

- `query products`: Returns all products
- `query product(id: Int!)`: Returns a single product by ID

## Project Structure

- `index.ts`: Main API server (Apollo + TypeScript)
- `products.ts`: Mock data and type definitions
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

```bash
# Clone or unzip this repo
cd <project-directory>

# Install dependencies
yarn
# or
npm install
```

### Running the API

```bash
# Start the API (will run on http://localhost:8081 by default)
yarn start
# or
npm run start
```

### Development

For TypeScript live reloading, you may use `ts-node-dev` (install globally if desired):

```bash
yarn global add ts-node-dev
yarn dev
# or
npx ts-node-dev index.ts
```

### Usage

Open [http://localhost:8081](http://localhost:8081) in your browser to access Apollo Server's GraphQL Playground.

#### Example Query

```graphql
query {
  products {
    id
    title
    description
    price
    stock
  }
}
```

---

**Note:** This project is for demonstration and development use only. No authentication or database is included.

