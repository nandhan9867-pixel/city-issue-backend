const bcrypt = require("bcryptjs");

const userModel = require("../models/userModel");

const generateToken = require("../utils/generateToken");

const registerUser = async (data) => {
  const existingUser =
    await userModel.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword =
    await bcrypt.hash(data.password, 10);

  const result =
    await userModel.createUser({
      ...data,
      password: hashedPassword
    });

  return result;
};

const loginUser = async (email, password) => {
  const user =
    await userModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isMatch =
    await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};

module.exports = {
  registerUser,
  loginUser
};