import fs from "fs";
import { MaterialsJson } from "./types.js";

export const readMaterialsJson = (
  pathToMaterialsJson: string
): Promise<MaterialsJson> => {
  return new Promise((resolve, reject) => {
    const metaFileContent = fs.readFileSync(pathToMaterialsJson, "utf-8");
    try {
      const materialsJson = JSON.parse(metaFileContent) as MaterialsJson;
      resolve(materialsJson);
    } catch (e) {
      reject("Provided file is not valid JSON file");
    }
  });
};
