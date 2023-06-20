import { promises } from "fs";

export const writeImage = (imageBuffer: Buffer, outputFilePath: string) => {
  return new Promise((resolve, reject) => {
    promises
      .writeFile(outputFilePath, imageBuffer)
      .then(() => {
        resolve(`Output image was successfully saved in ${outputFilePath}`);
      })
      .catch(() => {
        reject(`There was an error while saving output in ${outputFilePath}`);
      });
  });
};
