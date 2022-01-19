const path = require("path");
const postsCtrl = {};

// Models
const Post = require("../models/Post");

postsCtrl.createNewPost = (req, res) => {
  const pie = req.body.pie;
  const imgPostFile = req.files.imgPost;
  var imgPost = imgPostFile.name;
  const fileExtension = imgPostFile.mimetype.split('/')[1];
  var imgPost = imgPost +'.' + fileExtension;
  let destino = path.join(__dirname, '../public/img/')+imgPost;
  const errors = []; 

  if(!req.files){
    console.log("debes seleccionar una imagen");
    res.redirect("/");
  } else{
    imgPostFile.mv(destino, (err ) => {
      if (err) {
          return res.status(500).send(err);
      }
      else {
        const newPost = new Post({ pie, imgPost });
        newPost.user = req.user.name;
        newPost.save();
        res.redirect("/");
      }
  })
  }
};

postsCtrl.renderPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("/", { posts });
};

postsCtrl.renderEditForm = async (req, res) => {
  const post = await Post.findById(req.params.id).lean();
  if (post.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/");
  }
  res.render("edit-post", { post });
};

postsCtrl.updatePost = async (req, res) => {
  const pie = req.body.pie;
  await Post.findByIdAndUpdate(req.params.id, { pie });
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/");
};

postsCtrl.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/");
};

module.exports = postsCtrl;
