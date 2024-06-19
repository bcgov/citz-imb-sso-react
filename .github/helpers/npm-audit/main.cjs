const enhanceVulnerabilityList = require('./enhance-vulnerability-list.cjs');
const findIndirectVulnerableDependencies = require('./find-indirect-vulnerable-deps.cjs');
const runNpmAudit = require('./run-npm-audit.cjs');

// Requires semver dependency to run.

// Temporary console log
(async () => {
  try {
    const auditResult = await runNpmAudit();
    const auditResultWithParentDeps = await findIndirectVulnerableDependencies(auditResult);
    const summary = await enhanceVulnerabilityList(auditResultWithParentDeps);

    console.log(JSON.stringify(summary, null, 2));
  } catch (error) {
    console.error('Error enhancing vulnerabilities:', error);
  }
})();
