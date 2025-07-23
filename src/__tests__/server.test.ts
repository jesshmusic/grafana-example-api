import express from 'express';
import request from 'supertest';
import { startServer } from '../index';

let app: express.Application;

beforeAll(async () => {
  app = await startServer(true);
});

describe('Express app', () => {
  it('GET / returns OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('does NOT set CORS headers for unallowed origin', async () => {
    const res = await request(app).get('/').set('Origin', 'http://evil.com');
    // Should NOT allow this origin
    expect(res.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('sets CORS headers for allowed origin', async () => {
    const res = await request(app)
      .get('/')
      .set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
});
