import multer from 'multer';
import { MulterAzureStorage } from 'multer-azure-blob-storage';
import routes from './routes';

// if (process.env.NODE_ENV === 'production') {
const azureVideoStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONN_STR,
  accessKey: process.env.AZURE_STORAGE_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: 'videos',
});
const azureAvatarStorage = new MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONN_STR,
  accessKey: process.env.AZURE_STORAGE_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: 'avatars',
});
const videoDest = { storage: azureVideoStorage };
const avatarDest = { storage: azureAvatarStorage };

const multerVideo = multer(videoDest);
const multerAvatar = multer(avatarDest);

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'VTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');
