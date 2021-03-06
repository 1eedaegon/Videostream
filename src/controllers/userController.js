import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res, next) => {
  const {
    body: {
      name, email, password, password2,
    },
  } = req;

  if (password !== password2) {
    req.flash('error', "Password don't match!");
    res.status(400);
    res.render('join', { pageTitle: 'Join' });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render('login', { pageTitle: 'Log In' });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: 'Welcome!',
  failureFlash: "Can't login. Check email or password",
});

// Github login
export const githubLogin = passport.authenticate('github', {
  successFlash: 'Welcome! you are logined - Github',
  failureFlash: "Can't log in. Check email or password",
});
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id, avatar_url: avatarUrl, name, email,
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// Facebook login
export const facebookLogin = passport.authenticate('facebook', {
  successFlash: 'Welcome! you are logined - Facebook',
  failureFlash: "Can't log in. Check email or password",
});
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

// Kakao login
export const kakaoLogin = passport.authenticate('kakao', {
  successFlash: 'Welcome! you are logined - Kakao',
  failureFlash: "Can't log in. Check email or password",
});
export const kakaoLoginCallback = async (_, __, profile, cb) => {
  try {
    const {
      _json: {
        id,
        properties: { nickname: name, profile_image: avatarUrl },
        kakao_account: { email, has_email: hasEmail },
      },
    } = profile;
    const user = hasEmail ? await User.findOne({ email }) : await User.findOne({ name });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

// Need to update
export const logout = (req, res) => {
  req.flash('info', 'Logged out, See you later');
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render('detailUser', { pageTitle: 'detailUser', user: req.user });
};

export const detailUser = async (req, res) => {
  const { params: { id } } = req;
  try {
    const user = await User.findById(id).populate('videos');
    res.render('detailUser', { pageTitle: 'Detail user', user });
  } catch (error) {
    req.flash('error', 'User not found!');
    res.redirect(routes.home);
  }
};
// Edit profile
export const getEditProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit profile' });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.url.split('?')[0] : req.user.avatarUrl,
    });
    req.flash('success', 'Profile uploaded!');
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', "Can't update profile");
    res.redirect(routes.editProfile);
  }
};
// Change password
export const getChangePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change password' });
export const postChangePasswword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash('error', "Passwords didn't match!");
      res.status(400);
      res.redirect(`${routes.users}${routes.changePassword}`);
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash('error', "Can't change password!");
    res.status(400);
    res.redirect(`${routes.users}${routes.changePassword}`);
  }
};
