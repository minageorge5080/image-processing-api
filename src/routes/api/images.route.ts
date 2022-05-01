import express from "express";
import { isNumeric, resizeImage } from "../../utils";

// import fs from "fs";
import { promises as fs } from "fs";

const images = express.Router();

images.get(
  "/thumbnail/:name",
  async (
    request: express.Request,
    response: express.Response
  ): Promise<unknown> => {
    const imageNameArr = request.params.name.split(".");
    if (imageNameArr.length !== 2) {
      return response.status(400).send("Image name required!");
    }
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
    }

    const fullPath = `./public/images/full/${imageName}.${imageExt}`;
    const thumbPath = `./public/images/thumbnail/${imageName}(${width}x${height}).${imageExt}`;
    const thumbExists = await fs.stat(thumbPath).catch((e) => {});
    if (thumbExists) {
      return response.status(200).sendFile(thumbPath, { root: "." });
    }

    const fullExists = await fs.stat(fullPath).catch((e) => {});
    if (!fullExists) {
      return response.status(404).send("Image not found!");
    }

    console.log("Processing image ...............");
    await resizeImage(fullPath, width, height)
      .then((data) => fs.writeFile(thumbPath, data))
      .then((data) => response.status(200).sendFile(thumbPath, { root: "." }))
      .catch((err) => response.status(404).send("Image not found!"));
  }
);

export default images;
