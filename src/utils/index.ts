import sharp from "sharp";

export const isNumeric = (value: unknown): boolean => {
  if (typeof value != "string") return false;
  return /^-?\d+$/.test(value);
};

export const resizeImage = (
  path: string,
  width: number,
  height: number
): Promise<Buffer> => sharp(path).resize(width, height).toBuffer();
