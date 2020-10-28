"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

require("./passport");

var _middlewares = require("./middlewares");

var _routes = _interopRequireDefault(require("./routes"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var CookieStore = (0, _connectMongo["default"])(_expressSession["default"]); // Middlewares
// Secure

app.use((0, _helmet["default"])()); // Template engine

app.set('view engine', 'pug'); // Video storage
// app.use('/uploads', express.static('uploads'));
// Front-end

app.set('views', _path["default"].join(__dirname, 'views'));
app.use('/static', _express["default"]["static"](_path["default"].join(__dirname, 'static'))); // Cookie

app.use((0, _cookieParser["default"])()); // Json parser

app.use(_bodyParser["default"].json()); // URL parser

app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // Logger

app.use((0, _morgan["default"])('tiny')); // Make cookie with session

app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: _mongoose["default"].connection
  })
})); // User Authentication

app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Flash message

app.use((0, _expressFlash["default"])()); // Local middleware(Custom middleware)

app.use(_middlewares.localsMiddleware); // Routers

app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app;
exports["default"] = _default;