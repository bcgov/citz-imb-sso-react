const { checkNPMForBetaVersion } = require('./check-npm-for-beta-version.cjs');

/**
 * Validates use of the release tag input.
 * - Checks if the beta version exists on npm registry before allowing official release.
 * @param {string} packageName - Property 'name' of package.json
 * @param {string} version - Property 'version' of package.json
 */
const validateForReleaseTag = async (packageName, version) => {
  // Beta version must exist on npm registry.
  checkNPMForBetaVersion(packageName, version);
};

// Retrieve the version and package name from command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Error: Please provide both package name and version as arguments.');
  process.exit(1);
}

const packageName = args[0];
const version = args[1];

validateForReleaseTag(packageName, version);
