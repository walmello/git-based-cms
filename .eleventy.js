import path from "path";
import { removeOrphans } from "./plugins/garbageCollector.js";

const inputDir = path.resolve("src");
const outputDir = path.resolve("_site");

export default function (eleventyConfig) {
  eleventyConfig.addBundle("css");
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.addWatchTarget("public/**");
  eleventyConfig.addWatchTarget("src/_data/**");
  eleventyConfig.addWatchTarget("src/_includes/**");
  eleventyConfig.addPassthroughCopy({"public/": "/"});

  eleventyConfig.on("beforeBuild", () => {
    removeOrphans(inputDir, outputDir);
    console.log("✅ Build GC finished");
  })

  /*
  eleventyConfig.on("afterBuild", async () => {
    if(!fs.existsSync('_site')){ fs.mkdirSync('_site') }
    fs.cpSync('./src/_public', '_site', {recursive: true});
    fs.cpSync('./src/_public', '_site/site', {recursive: true});
    fs.cpSync('./src/_public', '_site/app', {recursive: true});
  })
  */

  eleventyConfig.setServerOptions({
    showAllHosts: true,
    port: 8080,
  })
}