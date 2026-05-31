const express = require("express");

const router = express.Router();

const authenticateUser =
require("../middleware/authMiddleware");

const authorizeRole =
require("../middleware/roleMiddleware");

router.get(
  "/public-dashboard",
  authenticateUser,
  authorizeRole("public"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Public User",
      user: req.user
    });
  }
);

router.get(
  "/admin-dashboard",
  authenticateUser,
  authorizeRole("admin"),
  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Admin",
      user: req.user
    });
  }
);

module.exports = router;