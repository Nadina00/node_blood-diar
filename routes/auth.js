const ctrlWrapper = require("../helpers/ctrlWrapper")
const express = require('express');
const router = express.Router();
const authMiddelwar = require("../middelwares/authMiddelwar")

const {register, logIn, logout, currentUser, userDailyСalories} = require("../controller/auth/authController")

router.post("/register", ctrlWrapper(register))
router.post("/login", ctrlWrapper(logIn))
router.get("/logout", authMiddelwar, ctrlWrapper(logout))
router.get("/current", authMiddelwar, ctrlWrapper(currentUser))
router.post("/userDailycalories", authMiddelwar, ctrlWrapper(userDailyСalories) )

module.exports = router ;