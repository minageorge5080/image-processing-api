import express from "express";
const routes = express.Router();
import images from "./api/images.route";

routes.use("/public/images", images);

export default routes;
