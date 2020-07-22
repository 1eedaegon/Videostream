import express from "express";
import {
  detailUser,
  editProfile,
  changePassword,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.detailUser(), detailUser);

export default userRouter;
