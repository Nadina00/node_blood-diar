const { User } = require("../../models/user");
//const RequestError = require("../../helpers/RequstError").default;
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = `${process.env.SECRET}`;

const fs = require("fs/promises");
const path = require("path");
const { token } = require("morgan");

const register = async (req, res, next) => {
  try {
    const { name, email, password, blood, dailyCalories } = req.body;
    console.log({ name, email, password, blood, dailyCalories });
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    await User.create({
      password: hashPassword,
      email,
      name,
      blood,
      dailyCalories,
    });
    const newUser = await User.findOne({ email });
    const payload = { id: newUser._id, name: newUser.name };
    const token = jwt.sign(payload, process.env.SECRET);
    await User.findByIdAndUpdate(newUser._id, { token }, { new: true });
    console.log(newUser);
    res.status(201).json({
      status: "Created",
      code: 201,
      user: {
        name,
        email,
        token,
        dailyCalories,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect login or password",
        data: "Bad request",
      });
    }
    const payload = { id: user._id, name: user.name };
    const token = jwt.sign(payload, process.env.SECRET);
    await User.findByIdAndUpdate(user._id, { token }, { new: true });
    res.json({
      status: "success",
      code: 200,
      user: {
        email,
        token,
        name: user.name,
      },
      dailyCalories: user.dailyCalories,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { token: null },
      { new: true }
    );
    return res.json({
      status: "success",
      code: 204,
      data: {
        message: "No Content",
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const { email, name, dailyCalories } = req.user;
    res.json({
      status: "success",
      code: 200,
      user: {
        email,
        name,
      },
      dailyCalories,
    });
  } catch (error) {
    next(error);
  }
};

const userDailyСalories = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    const { height, age, currentWeight, desiredWeight } = req.body;
    const dailyRate =
      10 * Number(currentWeight) +
      6.25 * Number(height) -
      5 * Number(age) -
      161 -
      10 * Number(desiredWeight);
    const newUser = await User.findByIdAndUpdate(
      _id,
      { dailyCalories: dailyRate },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: ctrlWrapper(register),
  logIn: ctrlWrapper(logIn),
  logout: ctrlWrapper(logout),
  currentUser: ctrlWrapper(currentUser),
  userDailyСalories: ctrlWrapper(userDailyСalories),
};
