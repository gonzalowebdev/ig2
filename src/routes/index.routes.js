const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderProfile } = require("../controllers/index.controller");
const { isAuthenticated } = require("../helpers/auth");

router.get("/",isAuthenticated, renderIndex);
router.get("/:name", renderProfile);

module.exports = router;
