const indexCtrl = {};
// Models
const Post = require("../models/Post");
const User = require("../models/User");

indexCtrl.renderIndex = async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup:{
        from: "users",
        localField: "user",
        foreignField:"name",
        as: "posts"
      }
    },
    {$unwind:"$posts"},
  ]).sort({createdAt:"desc"});
  res.render('index',{posts});
};

indexCtrl.renderProfile = async(req, res) => {
  userName = req.params.name;
  const result = await User.aggregate([
    {
      $lookup:{
        from: "posts",
        localField: "name",
        foreignField:"user",
        as: "posts"
      }
    },
    {$match:{
      $and:[{"name":userName}]
    }}
  ]);
  try{
    const posts = result[0].posts.reverse();
  }
  catch (err){
    res.send("sorry");
  };
  res.render('profile', {result: result[0]});
};

module.exports = indexCtrl;