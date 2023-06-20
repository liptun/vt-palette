import { createCanvas } from "@napi-rs/canvas";
import { MaterialsJson } from "./types.js";

export const createImageBufferFromMaterials = (
  materialsJson: MaterialsJson
) => {
  const imageSize = materialsJson.Materials.length === 16 ? 64 : 128;
  const tileSize = 16;
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext("2d");

  let currentColorIndex = 0;
  for (let y = imageSize / tileSize - 1; y >= 0; y--) {
    for (let x = 0; x < imageSize / tileSize; x++) {
      ctx.fillStyle = "#" + materialsJson.Materials[currentColorIndex].Color;
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      currentColorIndex++;
    }
  }

  return canvas.encodeSync("png");
};
