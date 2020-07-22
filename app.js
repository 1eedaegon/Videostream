import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
// Middlewares
// Secure
app.use(helmet());
// Template engine
app.set("view engine", "pug");
//
app.use("/uploads", express.static("uploads"));
// Cookie
app.use(cookieParser());
// Json parser
app.use(bodyParser.json());
// URL parser
app.use(bodyParser.urlencoded({ extended: true }));
// Logger
app.use(morgan("tiny"));
// Local middleware(Custom middleware)
app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
