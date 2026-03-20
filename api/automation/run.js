// api/automation/run.js
// Stub — real handler is in lib/automation/handlers/run.js.
// Named exports are re-exported here for run.test.js compatibility.
// No default export: prevents Vercel counting this as a serverless function.
export { evaluateCron, isRuleDue } from '../../lib/automation/handlers/run.js';
