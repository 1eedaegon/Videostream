"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

require("./models/Video");

require("./models/Comment");

require("./models/User");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var handleListen = function handleListen() {
  console.log("\u2B55 Listening on: http://localhost:".concat(PORT, " \u2714"));
};

_app["default"].listen(PORT, handleListen);