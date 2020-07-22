export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    res.redirect(routes.home);
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });
export const postLogin = (req, res) => res.redirect(routes.home);
// Need to update
export const logout = (req, res) => res.redirect(routes.home);

export const detailUser = (req, res) =>
  res.render("detailUser", { pageTitle: "Detail user" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change password" });
