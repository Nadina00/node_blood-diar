const ctrlWrapper = require('../helpers/ctrlWrapper').default;
const express = require("express");
const router = express.Router();
const authMiddelwar = require("../middelwares/authMiddelwar");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const {
  register,
  logIn,
  logout,
  currentUser,
  userDailyСalories,
} = require("../controller/auth/authController");

router.post("/register", ctrlWrapper(register));
router.post("/login", ctrlWrapper(logIn));
router.get("/logout", authMiddelwar, ctrlWrapper(logout));
router.get("/current", authMiddelwar, ctrlWrapper(currentUser));
router.post(
  "/userDailycalories",
  authMiddelwar,
  ctrlWrapper(userDailyСalories)
);

module.exports = router;
