// api/automation/[...slug].js
// Catch-all handler that routes all /api/automation/* requests.
// Deployed as the sole Vercel serverless function for this directory.
// Individual handler files (approve.js, run.js, etc.) are listed in
// .vercelignore so they are bundled as modules but not counted as functions.

import approveHandler from './approve.js';
import runHandler from './run.js';
import telegramHandler from './telegram.js';
import telegramTestHandler from './telegram-test.js';
import rulesIndexHandler from './rules/index.js';
import rulesIdHandler from './rules/[id].js';
import jobsIndexHandler from './jobs/index.js';
import jobsIdHandler from './jobs/[id].js';

export default async function handler(req, res) {
  const slug = req.query.slug || [];
  const [first, second] = slug;

  if (first === 'approve') return approveHandler(req, res);
  if (first === 'run') return runHandler(req, res);
  if (first === 'telegram-test') return telegramTestHandler(req, res);
  if (first === 'telegram') return telegramHandler(req, res);

  if (first === 'rules' && !second) return rulesIndexHandler(req, res);
  if (first === 'rules' && second) {
    req.query.id = second;
    return rulesIdHandler(req, res);
  }

  if (first === 'jobs' && !second) return jobsIndexHandler(req, res);
  if (first === 'jobs' && second) {
    req.query.id = second;
    return jobsIdHandler(req, res);
  }

  return res.status(404).json({ error: 'Not found' });
}
