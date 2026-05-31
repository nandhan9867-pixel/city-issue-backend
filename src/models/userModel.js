const db = require("../config/db");

const createUser = async (userData) => {
  const { name, email, password, phone, role } = userData;

  const [result] = await db.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password,
      phone,
      role
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [name, email, password, phone, role]
  );

  return result;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail
};