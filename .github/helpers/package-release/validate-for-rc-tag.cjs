/**
 * Validates version number when adding the rc tag so that
 * only major versions pass for use of the rc tag.
 * @param {string} version - Property of package.json
 */
const validateForRcTag = (version) => {
  // Split the version string by "."
  const versionParts = version.split('.');

  // Check if the second and third parts are not zero
  if (versionParts[1] !== '0' || (versionParts[2] && !versionParts[2].startsWith('0'))) {
    console.error("Error: 'rc' versionTag can only be set for major versions.");
    process.exit(1);
  }
};

// Retrieve the version from command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Error: Please provide the version from package.json as an argument.');
  process.exit(1);
}

const version = args[0];

validateForRcTag(version);
