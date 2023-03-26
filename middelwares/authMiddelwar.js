const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/user.js");
const RequestError = require("../helpers/RequstError").default;

const authMiddelwar = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw RequestError(401, "Invalid token");
  }

  if (!token) {
    throw RequestError(401, "Not authorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw RequestError(404, "Not found user");
    }

    req.user = user;

    next();
  } catch (error) {
    throw RequestError(401, error.message);
  }
};
module.exports = authMiddelwar;
