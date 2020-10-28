import path from 'path';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'express-flash';

import './passport';
import { localsMiddleware } from './middlewares';
import routes from './routes';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import apiRouter from './routers/apiRouter';

const app = express();
const CookieStore = MongoStore(session);
// Middlewares
// Secure
app.use(helmet());
// Template engine
app.set('view engine', 'pug');
// Video storage
// app.use('/uploads', express.static('uploads'));
// Front-end
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
// Cookie
app.use(cookieParser());
// Json parser
app.use(bodyParser.json());
// URL parser
app.use(bodyParser.urlencoded({ extended: true }));
// Logger
app.use(morgan('tiny'));
// Make cookie with session
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  }),
);

// User Authentication
app.use(passport.initialize());
app.use(passport.session());
// Flash message
app.use(flash());

// Local middleware(Custom middleware)
app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
