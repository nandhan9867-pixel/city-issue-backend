const express = require("express");

const router = express.Router();

const issueController =
require("../controllers/issueController");

const authenticateUser =
require("../middleware/authMiddleware");

const authorizeRole =
  require("../middleware/roleMiddleware");

  const upload =
require("../middleware/uploadMiddleware");

router.post(
  "/",
  authenticateUser,
  authorizeRole("public", "admin"),
  issueController.createIssue
);

router.post(
  "/:issueId/upload-image",
  authenticateUser,
  upload.single("image"),
  issueController.uploadIssueImage
);

router.get(
  "/my-issues",
  authenticateUser,
  issueController.getMyIssues
);

router.get(
  "/",
  authenticateUser,
  authorizeRole("admin"),
  issueController.getAllIssues
);

router.get(
  "/:id",
  authenticateUser,
  issueController.getIssueById
);

router.put(
  "/:id/status",
  authenticateUser,
  authorizeRole("admin"),
  issueController.updateIssueStatus
);

router.delete(
  "/:id",
  authenticateUser,
  issueController.deleteIssue
);

module.exports = router;