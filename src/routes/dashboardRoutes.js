const express = require("express");

const router = express.Router();

const authenticateUser =
require("../middleware/authMiddleware");

const authorizeRole =
require("../middleware/roleMiddleware");

const dashboardController =
require("../controllers/dashboardController");

router.get(
  "/admin",
  authenticateUser,
  authorizeRole("admin"),
  dashboardController.adminDashboard
);

router.get(
  "/user",
  authenticateUser,
  dashboardController.userDashboard
);

module.exports = router;