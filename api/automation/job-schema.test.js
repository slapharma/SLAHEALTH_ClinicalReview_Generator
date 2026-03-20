import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildJob } from './job-schema.js';

test('buildJob sets id with job_ prefix', () => {
  const job = buildJob({
    ruleId: 'r1',
    contentId: 'c1',
  });
  assert.match(job.id, /^job_/);
});

test('buildJob sets default status to pending_review', () => {
  const job = buildJob({
    ruleId: 'r1',
    contentId: 'c1',
  });
  assert.equal(job.status, 'pending_review');
});

test('buildJob sets approvedBy to null by default', () => {
  const job = buildJob({
    ruleId: 'r1',
    contentId: 'c1',
  });
  assert.equal(job.approvedBy, null);
});

test('buildJob sets createdAt to truthy value', () => {
  const job = buildJob({
    ruleId: 'r1',
    contentId: 'c1',
  });
  assert.ok(job.createdAt);
});

test('buildJob accepts custom status', () => {
  const job = buildJob({
    ruleId: 'r1',
    contentId: 'c1',
    status: 'auto_published',
  });
  assert.equal(job.status, 'auto_published');
});
