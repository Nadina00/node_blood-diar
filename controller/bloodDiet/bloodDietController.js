const RequestError = require("../../helpers/RequstError").default;
const { BloodDietProduct } = require("../../models/bloodDietProduct");
const { User } = require("../../models/user");

const getBloodDietProduct = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw RequestError(401, "Unauthorized");
  }
  try {
    const product = await BloodDietProduct({});
    res.json({
      status: "success",
      code: 200,
      product,
    });
  } catch (e) {
    throw RequestError(400, "Bad Request");
  }
};

const addBloodDietProduct = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  console.log(user);
  if (!user) {
    throw RequestError(401, "Unauthorized");
  }

  const { date, caloricityPerDay, product, weight, baseCaloriti } = req.body;
  console.log({ date, caloricityPerDay, product, weight, baseCaloriti });
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
  }
  !duplex
    ? res.status(201).json({
        status: "succes",
        code: 201,
        result,
      })
    : res.json({
        status: "success",
        code: 200,
        result,
      });
};

const getDateBloodDietProduct = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw RequestError(401, "Unauthorized");
  }

  const { date } = req.query;

  const result = await BloodDietProduct.find({ date, owner: _id });
  
  if (!result.length) {
    throw RequestError(404, "Added products not found on this date");
  }
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

const deleteBloodDietProduct = async (req, res, next) => {
  const { id } = req.params;
  const result = await BloodDietProduct.findByIdAndRemove(id);
  console.log(result);
  res.json({
    status: "success",
    code: 200,
    result,
  });
};

module.exports = {
  getBloodDietProduct,
  addBloodDietProduct,
  getDateBloodDietProduct,
  deleteBloodDietProduct,
};
