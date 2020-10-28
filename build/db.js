"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

if (process.env.PRODUCTION) {
  _mongoose["default"].connect(process.env.MONGO_URL, {
    auth: {
      user: process.env.MONGO_ADMIN_USER,
      password: process.env.MONGO_ADMIN_PASS
    },
    useNewUrlParser: true,
    useFindAndModify: false
  });
} else {
  _mongoose["default"].connect(process.env.MONGO_DEV_URL, {
    auth: {
      user: process.env.MONGO_DEV_ADMIN_USER,
      password: process.env.MONGO_DEV_ADMIN_PASS
    },
    useNewUrlParser: true,
    useFindAndModify: false
  });
}

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log('⭕ Connected to DB');
};

var handleError = function handleError(error) {
  return console.log("\u274C Error on DB Connection: ".concat(error));
};

db.once('open', handleOpen);
db.on('error', handleError);