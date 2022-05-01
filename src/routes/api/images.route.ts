import express from "express";
import sharp from "sharp";
import isNumeric from "../../utils";

import fs from "fs";
import { promises as fsPromises } from "fs";

const images = express.Router();

images.get("/thumbnail/:name", async (request, response, next) => {
  const imageNameArr = request.params.name.split(".");
  if (imageNameArr.length !== 2) {
    return response.status(400).send("Image name required!");
  } // TODO Send Error message.
  const imageName = imageNameArr[0];
  const imageExt = imageNameArr[1];

  const width: number = Number(
    isNumeric(request.query?.width) ? request.query?.width : 0
  );
  const height: number = Number(
    isNumeric(request.query?.height) ? request.query?.height : 0
  );
  if (width === 0 || height === 0) {
    return response.status(400).send("Image dimensions required!");
  } // TODO Send Error message.

  const fullPath = `./public/images/full/${imageName}.${imageExt}`;
  const thumbPath = `./public/images/thumbnail/${imageName}(${width}x${height}).${imageExt}`;
  const thumbRedirectPath = `/public/images/thumbnail/${imageName}(${width}x${height}).${imageExt}`;

  if (fs.existsSync(thumbPath)) {
    return response.redirect(thumbRedirectPath);
  } // Image processed before
  if (!fs.existsSync(fullPath)) {
    return response.status(404).send("Image not found!");
  } // TODO Send Error message.

  console.log("Processing image ...............");
  await sharp(fullPath)
    .resize(width, height)
    .toBuffer()
    .then((data) => fsPromises.writeFile(thumbPath, data))
    .then((data) => response.redirect(thumbRedirectPath))
    .catch((err) => response.status(404).send("Image not found!")); // TODO Send Error message.
});

export default images;
