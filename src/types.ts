export type MaterialsJson = {
  Materials: Array<{
    Color: string;
    CompanyTint: number;
    Emission: number;
    Glassiness: number;
    Smoothness: number;
    Specular: number;
  }>;
};

export enum MaterialType {
  Diffuse = "diffuse",
  Emission = "emission",
  Glassiness = "glassiness",
  Smoothness = "smoothness",
  Specular = "specular",
}
