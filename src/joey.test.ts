import { describe, it } from 'node:test';
import assert from 'node:assert';
import { app } from './main.js';

describe('Hono App', () => {
  it('export app', () => {
    assert.notStrictEqual(app, null);
  });

  it('return 404', async () => {
    const res = await app.request('/testingtesting');
    assert.strictEqual(res.status, 404);
  });
});