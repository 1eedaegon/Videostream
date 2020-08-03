// Global router
const HOME = "/",
  JOIN = "/join",
  LOGIN = "/login",
  SEARCH = "/search",
  //   User router
  USERS = "/users",
  DETAIL_USER = "/:id",
  EDIT_PROFILE = "/edit-profile",
  CHANGE_PASSWORD = "/change-password",
  //   Video router
  VIDEOS = "/videos",
  UPLOAD = "/upload",
  DETAIL_VIDEO = "/:id",
  EDIT_VIDEO = "/:id/edit",
  DELETE_VIDEO = "/:id/delete";


const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  search: SEARCH,
  users: USERS,
  detailUser: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return DETAIL_USER;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  detailVideo: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return DETAIL_VIDEO;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
};

export default routes;
