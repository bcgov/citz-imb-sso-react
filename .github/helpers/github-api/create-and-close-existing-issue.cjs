const { createIssue, closeIssue, findIssueByTitle } = require('./github-api-requests.cjs');

/**
 * FILE DOES NOT NEED TO BE EDITED.
 * Place within .github/helpers/github-api/
 */

const createAndCloseExistingIssue = async (issueTitle, issueBody) => {
  // Check for existing Issue.
  const existingIssueNumber = await findIssueByTitle(issueTitle);

  if (existingIssueNumber && !Number.isNaN(Number(existingIssueNumber))) {
    // Close old Issue.
    await closeIssue(Number(existingIssueNumber));
  }

  // Create new Issue.
  await createIssue(issueTitle, decodeURIComponent(issueBody));
};

module.exports = createAndCloseExistingIssue;
