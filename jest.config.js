const nextJest = require('next/jest.js');
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: [ 
    '**/__tests__/**/*.(js|ts|tsx)', 
    '**/?(*.)+(spec|test).(js|ts|tsx)', 
  ], 
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ]
}

module.exports = createJestConfig(config)