// import { videos } from "../db";
import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render('home', {
      pageTitle: 'Home',
      videos,
    });
  } catch (error) {
    res.render('home', {
      pageTitle: 'Home',
      videos: [],
    });
  }
};

export const search = async (req, res) => {
  const {
    query: {
      term: searchingBy,
    },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: 'i',
      },
    });
  } catch (error) {
    console.log(error, searchingBy, req.query.term);
  }
  res.render('search', {
    pageTitle: 'Search',
    searchingBy,
    videos,
  });
};

export const getUpload = (req, res) => res.render('upload', {
  pageTitle: 'Upload',
});

export const postUpload = async (req, res) => {
  // In local path(dev): file: { path }
  // In aws: file: { location }
  // In azure: file: { url }
  // Multer makes temporary Azure url, will be expire
  //  => url.split('?)[0]

  const {
    body: {
      title,
      description,
    },
    file: {
      url,
    },
  } = req;

  const newVideo = await Video.create({
    fileUrl: url.split('?')[0],
    title,
    description,
    creator: req.user.id,
  });

  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.detailVideo(newVideo.id));
};

export const detailVideo = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;
  try {
    const video = await Video.findById(id).populate('creator').populate('comments');
    res.render('detailVideo', {
      pageTitle: video.title,
      video,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== req.user.id) {
      throw Error();
    } else {
      res.render('editVideo', {
        pageTitle: `Edit ${video.title}`,
        video,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: {
      id,
    },
    body: {
      title,
      description,
    },
  } = req;
  try {
    await Video.findOneAndUpdate({
      _id: id,
    }, {
      title,
      description,
    });
    res.redirect(routes.detailVideo(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: {
      id,
    },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator === req.user.id) {
      await Video.findByIdAndRemove({ _id: id });
    } else {
      console.log(video.creator, req.user.id);
      throw Error();
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// Add comment
export const postAddComment = async (req, res) => {
  try {
    const {
      params: { id },
      body: { comment },
      user,
    } = req;
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
