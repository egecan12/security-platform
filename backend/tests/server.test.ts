import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
import app from '../src/app'; // Assuming you export your `app` instance in the main app file

describe('API Routes', () => {
  it('should return 400 and the welcome message for the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('2024 Welcome to API');
  });

  it('should return 404 for an unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toBe(404);
  });

});
