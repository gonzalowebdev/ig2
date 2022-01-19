const path = require("path");
const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.editUserForm = async (req, res)=>{
  const result = await User.findById(req.params.id).lean();
  res.render("users/editUser",{result});
};

usersCtrl.updateUser = async (req, res)=>{
  const name = req.body.name;
  const fullname = req.body.fullname;
  const bio = req.body.bio;

  if(!req.files){
    await User.findByIdAndUpdate(req.params.id, { name, bio, fullname });
  res.redirect("/");
  } else{
    const imgUserFile = req.files.imgUser;
    var imgUser = imgUserFile.name;
    const fileExtension = imgUserFile.mimetype.split('/')[1];
    var userImg = imgUser +'.' + fileExtension;
    let destino = path.join(__dirname, '../public/img/')+userImg;

    imgUserFile.mv(destino, async (err ) => {
      if (err) {
          return res.status(500).send(err);
      }
      else {
        await User.findByIdAndUpdate(req.params.id, { name, fullname, bio, userImg });
        res.redirect("/");
      }
    })
  }
  
};

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;