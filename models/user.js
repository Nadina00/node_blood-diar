const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  password: {
    type: String,
    required: [true, "Password is a required field"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
  },
  token: {
    type: String
  },
  blood: {
    type: Number,
    default: null,
  },
  dailyCalories: {
    type: Number,
    default: null,
  },
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const User = model("user", userSchema)

 module.exports = {User}
