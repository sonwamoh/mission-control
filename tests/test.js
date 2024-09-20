// tests/server.test.js
const request = require('supertest');
const app = require('../index.js'); // Adjust the path if necessary

describe('Mission Control REST API', () => {
  describe('POST /commands', () => {
    it('should receive a command and respond with confirmation', async () => {
      const command = { speed: 10, direction: 'forward' };
      const response = await request(app)
        .post('/commands')
        .send(command)
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Command received');
    });
  });

  describe('GET /commands', () => {
    it('should fetch the latest command', async () => {
      const command = { speed: 20, direction: 'reverse' };

      // Send a command first
      await request(app)
        .post('/commands')
        .send(command)
        .set('Accept', 'application/json');

      // Retrieve the command
      const response = await request(app).get('/commands');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(command);
    });

    it('should return 204 when no command is available', async () => {
      // Ensure latestCommand is null
      await request(app).get('/commands');

      const response = await request(app).get('/commands');

      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
  });

  describe('POST /status', () => {
    it('should update the consumer heartbeat and respond with confirmation', async () => {
      const response = await request(app).post('/status');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Status updated');
    });
  });

  describe('GET /status', () => {
    it('should return isConnected: true if heartbeat was received recently', async () => {
      // Send a heartbeat
      await request(app).post('/status');

      const response = await request(app).get('/status');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('isConnected', true);
    });
  });
});
