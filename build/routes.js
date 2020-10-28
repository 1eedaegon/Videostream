"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global router
var HOME = '/';
var JOIN = '/join';
var LOGIN = '/login';
var LOGOUT = '/logout';
var SEARCH = '/search'; //   User router

var USERS = '/users';
var DETAIL_USER = '/:id';
var EDIT_PROFILE = '/edit-profile';
var CHANGE_PASSWORD = '/change-password';
var ME = '/me'; //   Video router

var VIDEOS = '/videos';
var UPLOAD = '/upload';
var DETAIL_VIDEO = '/:id';
var EDIT_VIDEO = '/:id/edit';
var DELETE_VIDEO = '/:id/delete'; // Github

var GITHUB = '/auth/github';
var GITHUB_CALLBACK = '/auth/github/callback'; // Facebook

var FACEBOOK = '/auth/facebook';
var FACEBOOK_CALLBACK = '/auth/facebook/callback'; // Kakao

var KAKAO = '/auth/kakao';
var KAKAO_CALLBACK = '/auth/kakao/callback'; // API

var API = '/api';
var REGISTER_VIEW = '/:id/view';
var ADD_COMMENT = '/:id/comment';
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  detailUser: function detailUser(id) {
    if (id) {
      return "/users/".concat(id);
    }

    return DETAIL_USER;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  videos: VIDEOS,
  upload: UPLOAD,
  detailVideo: function detailVideo(id) {
    if (id) {
      return "/videos/".concat(id);
    }

    return DETAIL_VIDEO;
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    }

    return EDIT_VIDEO;
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    }

    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  api: API,
  register_view: REGISTER_VIEW,
  addComment: ADD_COMMENT
};
var _default = routes;
exports["default"] = _default;