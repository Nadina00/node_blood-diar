const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user.js");
const RequestError = require("../helpers/RequstError").default;

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(RequestError(401, "Invalid token"));
  }

  if (!token) {
    return next(RequestError(401, "Not authorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(RequestError(404, "Not found user"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authMiddleware;
