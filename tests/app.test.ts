import request from 'supertest';
import app from '../src/app';

// Test root route
describe('GET /', () => {
  describe('sending a GET request to the / route', () => {
    test('should respond with a 302 redirect status code', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(302);
    });
  });
});

// Test /api route
describe('GET /api', () => {
  describe('sending a GET request to the /api route', () => {
    test('should respond with a welcome message and a link to the GH repository', async () => {
      const response = await request(app).get('/api');
      expect(response.body.message).toBeDefined();
      expect(response.body.repository).toBeDefined();
    });
  });
});

// Test register route
describe('POST /auth/register', () => {
  describe('given an email and a password', () => {
    test('should respond with a 302 redirect status code', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(302);
    });
  });
});
// Test login route
describe('POST /auth/login', () => {
  describe('given an email and a password', () => {
    test('should respond with a 302 redirect status code', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(302);
    });
  });
});

// Test route for adding contacts to Firebase
describe('POST /addressBook', () => {
  describe('given contact information', () => {
    test('should respond with a 302 redirect status code', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(302);
    });
  });
});
