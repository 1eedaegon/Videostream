import express from 'express';
import routes from '../routes';
import {
  getUpload,
  detailVideo,
  postUpload,
  getEditVideo,
  postEditVideo,
  deleteVideo,
} from '../controllers/videoController';
import { onlyPrivate, uploadVideo } from '../middlewares';

const videoRouter = express.Router();

// upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
// video detail
videoRouter.get(routes.detailVideo(), detailVideo);
// video edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
// video delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
