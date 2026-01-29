import fs from 'fs';
import path from "path";
const inputDir = path.resolve("src");
const outputDir = path.resolve("_site");

export function removeOrphans(input, output) {
  if (!fs.existsSync(output)) return;

  const outputItems = fs.readdirSync(output);

  outputItems.forEach(item => {
    const outputPath = path.join(output, item);
    const inputPath = path.join(input, item);

    if (!fs.existsSync(inputPath)) {
      fs.rmSync(outputPath, { recursive: true, force: true });
      console.log("🗑️ Removed orphan:", outputPath);
    } else if (fs.statSync(outputPath).isDirectory()) {
      removeOrphans(inputPath, outputPath); // recursivo
    }
  });
}