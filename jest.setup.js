// jest.setup.js
// Add custom setup for Jest tests

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.COMTELE_API_KEY = 'test-api-key';
process.env.BLOB_READ_WRITE_TOKEN = 'test-blob-token';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
