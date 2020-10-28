import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import KakaoStrategy from 'passport-kakao';
import dotenv from 'dotenv';
import User from './models/User';
import { facebookLoginCallback, githubLoginCallback, kakaoLoginCallback } from './controllers/userController';
import routes from './routes';

dotenv.config();

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `${process.env.PRODUCTION ? process.env.HOST_URL : 'http://localhost:4000'}${routes.githubCallback}`,
  },
  githubLoginCallback),
);

passport.use(
  new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `${process.env.PRODUCTION ? process.env.HOST_URL : 'http://localhost:4000'}${routes.facebookCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email'],
  },
  facebookLoginCallback),
);

passport.use(
  new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `${process.env.PRODUCTION ? process.env.HOST_URL : 'http://localhost:4000'}${routes.kakaoCallback}`,
  },
  kakaoLoginCallback),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
