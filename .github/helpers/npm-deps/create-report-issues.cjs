const path = require('path');
const createAndCloseExistingIssue = require('../github-api/create-and-close-existing-issue.cjs');
const outputText = require(path.resolve(__dirname, `../../../outputText.json`));

/**
 * THIS FILE DOES NOT REQUIRE ANY EDITING.
 * Place within .github/helpers/npm-deps/
 */

// Get package.json paths from env.
const packageJsonPaths = JSON.parse(process.env.packageJsonPaths);

(async () => {
  // Create an array of promises for each packageJsonPath.
  const promises = packageJsonPaths.map(async (packagePath) => {
    const issueTitle =
      packagePath !== '.' ? `${packagePath} NPM Dependency Report` : 'NPM Dependency Report';
    // Await the completion of create and close existing issue.
    await createAndCloseExistingIssue(issueTitle, outputText[packagePath]);
  });

  // Wait for all issues to be created.
  await Promise.all(promises);
})();
