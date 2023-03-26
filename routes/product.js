const ctrlWrapper = require("../helpers/ctrlWrapper");
const authMiddelwar = require("../middelwares/authMiddelwar");
const express = require("express");
const router = express.Router();

const {
  productList,
  productListByType,
  dailyСalories,
  } = require("../controller/products/productController");

router.get("/productList", ctrlWrapper(productList));
router.post("/productBloodType", ctrlWrapper(productListByType));
router.post("/dailycalories", ctrlWrapper(dailyСalories));


module.exports = router;
