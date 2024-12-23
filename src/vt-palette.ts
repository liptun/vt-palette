import fs from "fs";
import chalk from "chalk";
import { join } from "path";
import { readMaterialsJson } from "./readMaterialsJson.js";
import { createImageBufferFromMaterials } from "./imageCreator.js";
import { writeImage } from "./writeImage.js";
import {
  combinedImageTask,
  diffuseImageTask,
  emissionImageTask,
  glassinessImageTask,
  smoothnessImageTask,
  specularImageTask,
} from "./queueItems.js";

const [_, __, cwd, ...args] = process.argv;

type ArgsData = {
  inputFile?: string;
  outputDir?: string;
  flags: string[];
};
const argsData = args.reduce<ArgsData>(
  (acc, arg) => {
    const draftAcc = { ...acc };
    if (arg.startsWith("-")) {
      draftAcc.flags = [...draftAcc.flags, ...arg.substring(1).split('')]
    } else if (!draftAcc.inputFile) {
      draftAcc.inputFile = arg;
    } else {
      draftAcc.outputDir = arg;
    }
    return draftAcc;
  },
  { inputFile: undefined, outputDir: undefined, flags: [] } as ArgsData
);

const { inputFile, outputDir, flags } = argsData;

const inputFilePath = fs.existsSync(inputFile || "")
  ? inputFile
  : `${cwd}/${inputFile}`;

const inputFileExists = fs.existsSync(inputFilePath || "");

const outputDirPath = outputDir ?? cwd;

if (flags.includes("v")) {
  console.log("Voxel Tycoon image palette creator v1.1");
  process.exit(0);
}
if (flags.includes("h")) {
  console.log(`Voxel Tycoon image palette creator is a tool for creating grid image texture form *.obj.meta files
${chalk.yellow("Usage:")}
vt-palette <path/to/obj/meta/file> <path/to/output/dir> [output options]

examples:
  vt-palette train.obj.meta
  vt-palette train.obj.meta ~/Desktop
  vt-palette train.obj.meta ~/Desktop -d -e

${chalk.yellow("Available params:")}
${chalk.blue.bold("-v")}: shows script version
${chalk.blue.bold("-m")}: shows this manual
${chalk.yellow("Output options:")}
${chalk.blue.bold("-d")}: Include diffuse map image
${chalk.blue.bold("-e")}: Include emission map image
${chalk.blue.bold("-g")}: Include glassiness map image
${chalk.blue.bold("-s")}: Include smoothness map image
${chalk.blue.bold("-S")}: Include specular map image
${chalk.blue.bold("-a")}: Include all maps images
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
        let createImagesQueue = [];
        flags.includes("d") && createImagesQueue.push(diffuseImageTask);
        flags.includes("e") && createImagesQueue.push(emissionImageTask);
        flags.includes("g") && createImagesQueue.push(glassinessImageTask);
        flags.includes("s") && createImagesQueue.push(smoothnessImageTask);
        flags.includes("S") && createImagesQueue.push(specularImageTask);
        if (flags.includes("a")) {
          createImagesQueue = [...combinedImageTask];
        }

        createImagesQueue.length === 0 &&
          createImagesQueue.push({ ...diffuseImageTask, suffix: "" });

        createImagesQueue.forEach(({ materialType, suffix }) => {
          const imageBufer = createImageBufferFromMaterials(
            materials,
            materialType
          );
          writeImage(imageBufer, join(outputDirPath, `palette${suffix}.png`))
            .then((m) => console.log(chalk.green(m)))
            .catch((e) => console.log(chalk(e)));
        });
      })
      .catch((e) => {
        console.log(chalk.red(e));
        process.exit(1);
      });
};

if (typeof inputFile === "undefined") {
  console.log(chalk.red("You need to specify input file!"), chalk.yellow("Use vt-palette -h for help"));
  process.exit(1);
}
main();
