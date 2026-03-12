const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: function () {
      return this.roles === "user"; 
    }
  }
}, {timestamps: true});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;