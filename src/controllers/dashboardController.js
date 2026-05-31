const db = require("../config/db");

const adminDashboard = async (req, res) => {

  try {

    const [[users]] =
      await db.query(
        "SELECT COUNT(*) totalUsers FROM users"
      );

    const [[issues]] =
      await db.query(
        "SELECT COUNT(*) totalIssues FROM issues"
      );

    const [[pending]] =
      await db.query(
        "SELECT COUNT(*) pending FROM issues WHERE status='Pending'"
      );

    const [[inProgress]] =
      await db.query(
        "SELECT COUNT(*) inProgress FROM issues WHERE status='In Progress'"
      );

    const [[solved]] =
      await db.query(
        "SELECT COUNT(*) solved FROM issues WHERE status='Solved'"
      );

    res.json({
      totalUsers: users.totalUsers,
      totalIssues: issues.totalIssues,
      pending: pending.pending,
      inProgress: inProgress.inProgress,
      solved: solved.solved
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const userDashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    const [[myIssues]] =
      await db.query(
        "SELECT COUNT(*) myIssues FROM issues WHERE user_id=?",
        [userId]
      );

    const [[pending]] =
      await db.query(
        "SELECT COUNT(*) pending FROM issues WHERE user_id=? AND status='Pending'",
        [userId]
      );

    const [[inProgress]] =
      await db.query(
        "SELECT COUNT(*) inProgress FROM issues WHERE user_id=? AND status='In Progress'",
        [userId]
      );

    const [[solved]] =
      await db.query(
        "SELECT COUNT(*) solved FROM issues WHERE user_id=? AND status='Solved'",
        [userId]
      );

    res.json({
      myIssues: myIssues.myIssues,
      pending: pending.pending,
      inProgress: inProgress.inProgress,
      solved: solved.solved
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  adminDashboard,
  userDashboard
};