import { createCanvas } from "@napi-rs/canvas";
import { MaterialsJson, MaterialType } from "./types.js";

export const createImageBufferFromMaterials = (
  materialsJson: MaterialsJson,
  materialType: MaterialType = MaterialType.Diffuse
) => {
  const imageSize = materialsJson.Materials.length === 16 ? 64 : 128;
  const tileSize = 16;
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext("2d");

  let currentColorIndex = 0;
  for (let y = imageSize / tileSize - 1; y >= 0; y--) {
    for (let x = 0; x < imageSize / tileSize; x++) {
      const currentMaterial = materialsJson.Materials[currentColorIndex];
      if (materialType === MaterialType.Diffuse) {
        ctx.fillStyle = "#" + currentMaterial.Color;
      } else {
        let intensivityValue = 0;
        switch (materialType) {
          case MaterialType.Emission:
            intensivityValue = currentMaterial.Emission;
            break;
          case MaterialType.Glassiness:
            intensivityValue = currentMaterial.Glassiness;
            break;
          case MaterialType.Smoothness:
            intensivityValue = currentMaterial.Smoothness;
            break;
          case MaterialType.Specular:
            intensivityValue = currentMaterial.Specular;
            break;
        }
        ctx.fillStyle = "#" + intensivityValue.toString(16).repeat(3);
      }

      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      currentColorIndex++;
    }
  }

  return canvas.encodeSync("png");
};
