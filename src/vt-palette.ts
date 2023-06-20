import fs from "fs";
import chalk from "chalk";
import { createCanvas } from "@napi-rs/canvas";
import { join } from "path";

const [_, __, cwd, ...args] = process.argv;

let error = false;
let debug = false;

const flags = args.filter((arg) => arg.startsWith("-"));
const inputFile = args.filter((arg) => !arg.startsWith("-"))[0];
const outputFile = args.filter((arg) => !arg.startsWith("-"))[1];
const inputFilePath = `${cwd}/${inputFile}`;

const fileExists = fs.existsSync(inputFilePath || "");

if (flags.includes("--debug")) {
  debug = true;
}
debug &&
  console.log("debug info", { inputFilePath, outputFile, fileExists, flags });

if (flags.includes("-v")) {
  console.log(`Voxel Tycoon palette image generator v1.0`);
  process.exit(0);
}
if (flags.includes("-h")) {
  console.log(`This script creates grid texture image from *.obj.meta files`);
  process.exit(0);
}
if (!inputFile && flags.length === 0) {
  error = true;
}

if (error) {
  console.log(
    chalk.red(
      "Provide valid arguments to script, use vt-palette -h for more information"
    )
  );
  process.exit(1);
}

type MetaJSON = {
  Materials: [
    {
      Color: string;
      CompanyTint: number;
      Emission: number;
      Glassiness: number;
      Smoothness: number;
      Specular: number;
    }
  ];
};

const metaFileContent = fs.readFileSync(inputFilePath, "utf-8");
try {
  const metaFileJSON = JSON.parse(metaFileContent) as MetaJSON;

  const canvas = createCanvas(64, 64);
  const ctx = canvas.getContext("2d");

  let currentColorIndex = 0;
  for (let y = 3; y >= 0; y--) {
    for (let x = 0; x < 4; x++) {
      ctx.fillStyle = "#" + metaFileJSON.Materials[currentColorIndex].Color;
      ctx.fillRect(x * 16, y * 16, 16, 16);
      currentColorIndex++;
    }
  }

  const pngData = canvas.encodeSync("png");
  const outputFilePath = outputFile ? outputFile : join(cwd, "palette.png");
  fs.writeFileSync(outputFilePath, pngData);
  console.log(chalk.green(`Image saved to ${outputFilePath}`));
} catch (e) {
  console.log(chalk.red("Provided file is not valid JSON file"));
  process.exit(1);
}
