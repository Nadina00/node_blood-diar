const { Product } = require("../../models/product");
const RequestError = require("../../helpers/RequstError").default;
const { User } = require("../../models/user");
const { token } = require("morgan");

const productList = async (req, res, next) => {
  const result = await Product.find({});
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

const productListByType = async (req, res) => {
  const { blood } = req.body;
  const products = await Product.find({});
  const list = products.reduce(function (newArr, product) {
    if (product.groupBloodNotAllowed[blood] === true) {
      newArr.push(product);
    }
    return newArr;
  }, []);
  res.json({
    status: "success",
    code: 200,
    list,
  });
};

const dailyСalories = async (req, res) => {
  const { height, age, currentWeight, desiredWeight } = req.body;
  console.log(height, age, currentWeight, desiredWeight);
  const dailyRate =
    10 * Number(currentWeight) +
    6.25 * Number(height) -
    5 * Number(age) -
    161 -
    10 * Number(desiredWeight);
  console.log("dailyRate", dailyRate);
  
     res.json({
    status: "success",
    code: 200,
    dailyRate,
  });
};



module.exports = {
  productList,
  productListByType,
  dailyСalories,
  
};
