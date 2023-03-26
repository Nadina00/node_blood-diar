const mongoose = require("mongoose")
require("dotenv").config();

const connectMongo = async () => {
    await mongoose.connect(process.env.MONGO_URL);
  };
  module.exports = { connectMongo };