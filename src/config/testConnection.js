const db = require("./db");

const testConnection = async () => {
  try {
    const [rows] = await db.query("SELECT 1");

    console.log("Database Connected Successfully");

    console.log(rows);
  } catch (error) {
    console.error("Database Connection Failed");

    console.error(error.message);
  }
};

module.exports = testConnection;