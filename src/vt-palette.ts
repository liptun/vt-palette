import fs from "fs";
import chalk from "chalk";
import { join } from "path";
import { readMaterialsJson } from "./readMaterialsJson.js";
import { createImageBufferFromMaterials } from "./imageCreator.js";
import { writeImage } from "./writeImage.js";

const [_, __, cwd, ...args] = process.argv;

const inputFile = args.filter((arg) => !arg.startsWith("-"))[0];
const inputFilePath = `${cwd}/${inputFile}`;
const inputFileExists = fs.existsSync(inputFilePath || "");

const outputFile = args.filter((arg) => !arg.startsWith("-"))[1];
const outputFilePath = outputFile ? outputFile : join(cwd, "palette.png");

const main = () => {
  if (!inputFileExists) {
    console.log(chalk.red(`File ${inputFilePath} don't exists`));
    process.exit(1);
  }

  readMaterialsJson(inputFilePath)
    .then((materials) => {
      const imageBufer = createImageBufferFromMaterials(materials);
      writeImage(imageBufer, outputFilePath)
        .then((m) => console.log(chalk.green(m)))
        .catch((e) => console.log(chalk(e)));
    })
    .catch((e) => {
      console.log(chalk.red(e));
      process.exit(1);
    });
};

main();
