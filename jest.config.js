module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/__tests__/**"
  ],
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 75,
      lines: 80,
      statements: 80
    }
  }
};
