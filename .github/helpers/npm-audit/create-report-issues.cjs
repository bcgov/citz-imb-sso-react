const path = require('path');
const createAndCloseExistingIssue = require('../github-api/create-and-close-existing-issue.mjs');
const outputText = require(path.resolve(__dirname, `../../../outputText.json`));

/**
 * THIS FILE DOES NOT REQUIRE ANY EDITING.
 * Place within .github/helpers/npm-audit/
 */

// Get directory paths from env.
const directoryPaths = JSON.parse(process.env.directoryPaths);

(async () => {
  // Create an array of promises for each directory.
  const promises = directoryPaths.map(async (dirPath) => {
    const issueTitle =
      dirPath !== '.' ? `${dirPath} NPM Vulnerability Report` : 'NPM Vulnerability Report';
    // Await the completion of create and close existing issue.
    await createAndCloseExistingIssue(issueTitle, outputText[dirPath]);
  });

  // Wait for all issues to be created.
  await Promise.all(promises);
})();
