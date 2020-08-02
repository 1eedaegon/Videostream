import express from "express";
import routes from "../routes";
import {
  getUpload,
  detailVideo,
  postUpload,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
// video detail
videoRouter.get(routes.detailVideo(), detailVideo);
// video edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
// videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
