import express from "express";
import routes from "../routes";
import {
  getUpload,
  detailVideo,
  editVideo,
  postUpload,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.detailVideo(), detailVideo);
// videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
