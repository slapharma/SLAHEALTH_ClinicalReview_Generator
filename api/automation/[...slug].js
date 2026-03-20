// api/automation/[...slug].js
// Catch-all handler that routes all /api/automation/* requests.
// This is the sole Vercel serverless function for the automation module.
// Handler logic lives in lib/automation/handlers/ (outside api/) so Vercel
// does not count each handler as a separate function.

import approveHandler from '../../lib/automation/handlers/approve.js';
import runHandler from '../../lib/automation/handlers/run.js';
import telegramHandler from '../../lib/automation/handlers/telegram.js';
import telegramTestHandler from '../../lib/automation/handlers/telegram-test.js';
import rulesIndexHandler from '../../lib/automation/handlers/rules-index.js';
import rulesIdHandler from '../../lib/automation/handlers/rules-id.js';
import jobsIndexHandler from '../../lib/automation/handlers/jobs-index.js';
import jobsIdHandler from '../../lib/automation/handlers/jobs-id.js';

export default async function handler(req, res) {
  // req.query.slug may be a string (single segment) or array (multiple segments)
  // in non-Next.js Vercel serverless. Normalise to array.
  const rawSlug = req.query.slug || [];
  const slug = [].concat(rawSlug);
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
