"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadAvatar = exports.uploadVideo = exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _multerAzureBlobStorage = require("multer-azure-blob-storage");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// if (process.env.NODE_ENV === 'production') {
var azureVideoStorage = new _multerAzureBlobStorage.MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONN_STR,
  accessKey: process.env.AZURE_STORAGE_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: 'videos'
});
var azureAvatarStorage = new _multerAzureBlobStorage.MulterAzureStorage({
  connectionString: process.env.AZURE_STORAGE_CONN_STR,
  accessKey: process.env.AZURE_STORAGE_KEY,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  containerName: 'avatars'
});
var videoDest = {
  storage: azureVideoStorage
};
var avatarDest = {
  storage: azureAvatarStorage
};
var multerVideo = (0, _multer["default"])(videoDest);
var multerAvatar = (0, _multer["default"])(avatarDest);

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = 'VTube';
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;
var uploadVideo = multerVideo.single('videoFile');
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single('avatar');
exports.uploadAvatar = uploadAvatar;