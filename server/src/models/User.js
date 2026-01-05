const mongoose = require("mongoose");
const { ROLE_ENUM } = require("../utils/enumSystem");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: [ROLE_ENUM.ADMIN, ROLE_ENUM.USER],
    default: ROLE_ENUM.USER
  },
  refreshToken: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;