import { MaterialType } from "./types.js";

export const diffuseImageTask = {
  materialType: MaterialType.Diffuse,
  suffix: `_${MaterialType.Diffuse}`,
};

export const emissionImageTask = {
  materialType: MaterialType.Emission,
  suffix: `_${MaterialType.Emission}`,
};

export const glassinessImageTask = {
  materialType: MaterialType.Glassiness,
  suffix: `_${MaterialType.Glassiness}`,
};

export const smoothnessImageTask = {
  materialType: MaterialType.Smoothness,
  suffix: `_${MaterialType.Smoothness}`,
};

export const specularImageTask = {
  materialType: MaterialType.Specular,
  suffix: `_${MaterialType.Specular}`,
};

export const combinedImageTask = [
  diffuseImageTask,
  emissionImageTask,
  glassinessImageTask,
  smoothnessImageTask,
  specularImageTask,
];
