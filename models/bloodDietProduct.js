const Schema = require('mongoose').Schema;
const {model} = require("mongoose")
const mongoose = require('mongoose');

const bloodDietProductSchema = new Schema(
  {
    id: {
        type: String
    },
    date: {
      type: String,
    },
    baseCaloriti: {
      type: Number,
    },
    product: {
      type: String,
    },
    weight: {
      type: Number,
    },
    sum: {
        type: Number,
      },
      dailyCalories: {
        type: Number,
        default: null,
      },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
  },
  { versionKey: false, timestamps: true }
);
const BloodDietProduct = model("BloodDietProduct", bloodDietProductSchema);

module.exports = { BloodDietProduct };
