const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  editUserForm,
  updateUser,
  logout
} = require("../controllers/users.controller");
// Helpers
const { isAuthenticated } = require("../helpers/auth");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/editUser/:id", isAuthenticated, editUserForm);

router.put("/users/editUser/:id", isAuthenticated, updateUser);

router.get("/users/logout", logout);

module.exports = router;
