import fs from "fs";
import chalk from "chalk";
import { join } from "path";
import { readMaterialsJson } from "./readMaterialsJson.js";
import { createImageBufferFromMaterials } from "./imageCreator.js";
import { writeImage } from "./writeImage.js";

const [_, __, cwd, ...args] = process.argv;

type ArgsData = {
  inputFile?: string;
  outputFile?: string;
  flags: string[];
};
const argsData = args.reduce<ArgsData>(
  (acc, arg) => {
    const draftAcc = { ...acc };
    if (arg.startsWith("-")) {
      draftAcc.flags.push(arg);
    } else if (!draftAcc.inputFile) {
      draftAcc.inputFile = arg;
    } else {
      draftAcc.outputFile = arg;
    }
    return draftAcc;
  },
  { inputFile: undefined, outputFile: undefined, flags: [] } as ArgsData
);

const { inputFile, outputFile, flags } = argsData;

const inputFilePath = fs.existsSync(inputFile || "")
  ? inputFile
  : `${cwd}/${inputFile}`;

const inputFileExists = fs.existsSync(inputFilePath || "");

const outputFilePath = outputFile
  ? fs.existsSync(outputFile) && fs.lstatSync(outputFile).isDirectory()
    ? `${outputFile}/palatte.png`
    : outputFile
  : join(cwd, "palette.png");

if (outputFile && !outputFile?.endsWith(".png")) {
  console.log(chalk.red("Output must be png filetype"));
  process.exit(1);
}

if (flags.includes("-v")) {
  console.log("Voxel Tycoon image palette creator v1.0");
  process.exit(0);
}
if (flags.includes("-h")) {
  console.log(`Voxel Tycoon image palette creator is a tool for creating grid image texture form *.obj.meta files
${chalk.yellow("Usage:")}
vt-palette <path/to/obj/meta/file> <path/to/save/location/of/image>

${chalk.yellow("Available params:")}
${chalk.blue.bold("- v")}: shows script version
${chalk.blue.bold("- m")}: shows this manual
`);
  process.exit(0);
}

const main = () => {
  if (!inputFileExists) {
    console.log(chalk.red(`File ${inputFilePath} don't exists`));
    process.exit(1);
  }

  inputFilePath &&
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

inputFile && main();
