const RequestError = require("../../helpers/RequstError").default;
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const { BloodDietProduct } = require("../../models/bloodDietProduct");
const { User } = require("../../models/user");

const getBloodDietProduct = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    return next(RequestError(401, "Unauthorized"));
  }
  const product = await BloodDietProduct({});
  if (!product.length) {
    return next(RequestError(404, "Products not found"));
  }
  res.json({
    status: "success",
    code: 200,
    product,
  });
};

const addBloodDietProduct = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    return next(RequestError(401, "Unauthorized"));
  }

  const { date, caloricityPerDay, product, weight, baseCaloriti } = req.body;
  const sum = (weight * baseCaloriti) / 100;
  const products = await BloodDietProduct.find({ date, owner: _id });
  const duplex = products.find((it) => it.product === product);

  let result;
  if (!duplex) {
    result = await BloodDietProduct.create({
      ...req.body,
      sum,
      owner: _id,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      result,
    });
  } else {
    result = await BloodDietProduct.findByIdAndUpdate(
      duplex._id,
      {
        product: duplex.product,
        weight: Math.round(duplex.weight + weight),
        sum: Math.round(duplex.sum + sum),
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      code: 200,
      result,
    });
  }
};

const getDateBloodDietProduct = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    return next(RequestError(401, "Unauthorized"));
  }

  const { date } = req.query;
  const result = await BloodDietProduct.find({ date, owner: _id });
  
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

const deleteBloodDietProduct = async (req, res, next) => {
  const { id } = req.params;
  const result = await BloodDietProduct.findByIdAndRemove(id);
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  getBloodDietProduct: ctrlWrapper(getBloodDietProduct),
  addBloodDietProduct: ctrlWrapper(addBloodDietProduct),
  getDateBloodDietProduct: ctrlWrapper(getDateBloodDietProduct),
  deleteBloodDietProduct: ctrlWrapper(deleteBloodDietProduct),
};