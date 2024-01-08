import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { resolve, join } from "path";

/**
 * Removes all imports of *.css files in *.d.ts files.
 * Typescript doesn't handle css files when compiling declaration files and
 * the bundling process for declaration files can't handle css imports.
 */

const buildDir = resolve("build");

const processDirectory = (directory) => {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = join(directory, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      processDirectory(filePath); // Recursively inspect the directory
    } else if (file.endsWith(".d.ts")) {
      let fileContent = readFileSync(filePath, "utf-8");
      // Remove lines that import CSS files
      fileContent = fileContent
        .split("\n")
        .filter(
          (line) => !(line.trim().startsWith("import") && line.includes(".css"))
        )
        .join("\n");

      // Write the cleaned file content back to the file
      writeFileSync(filePath, fileContent);
    }
  });
};

processDirectory(buildDir);
