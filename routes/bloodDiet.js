const ctrlWrapper = require("../helpers/ctrlWrapper");
const authMiddelwar = require("../middelwares/authMiddelwar");
const express = require("express");
const router = express.Router();
const {
  getBloodDietProduct,
  addBloodDietProduct,
  getDateBloodDietProduct,
  deleteBloodDietProduct,
} = require("../controller/bloodDiet/bloodDietController");

router.get("/all", authMiddelwar, ctrlWrapper(getBloodDietProduct));
router.post("/add", authMiddelwar, ctrlWrapper(addBloodDietProduct));
router.get("/getDate", authMiddelwar, ctrlWrapper(getDateBloodDietProduct));
router.delete("/:id", authMiddelwar, ctrlWrapper(deleteBloodDietProduct));

module.exports = router;
