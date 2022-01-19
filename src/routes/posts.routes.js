const express = require("express");
const router = express.Router();

// Controller
const {
  createNewPost, 
  renderEditForm,
  updatePost,
  deletePost
} = require("../controllers/posts.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

router.post("/newPost", isAuthenticated, createNewPost);

// Edit Notes
router.get("/post/edit/:id", isAuthenticated, renderEditForm);

router.put("/post/edit-post/:id", isAuthenticated, updatePost);

// Delete Notes
router.delete("/post/delete/:id", isAuthenticated, deletePost);

module.exports = router;
