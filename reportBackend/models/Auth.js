const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Category = require("./Category")

const userSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is Requires"],
    },
    unit: {
      type: String,
      required: [true, "Unit is Requires"],
    },
    level: {
      type: Number,
      required: [true, "Level is Requires"],
    },
    loginCount:{
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      required: [true, "First Name is Requires"],
      min: [10, "First Name Must not be less than 10 characters"],
      max: [100, "First Name Must not exceed 100 characters"],
    },
    otherName: {
      type: String,
      required: [true, "Other Name is Requires"],
      min: [10, "Other Name Must not be less than 10 characters"],
      max: [100, "Other Name Must not exceed 100 characters"],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Requires"],
      min: [10, "Last Name Must not be less than 10 characters"],
      max: [100, "Last Name Must not exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone is Requires"],
    },
    email: {
      type: String,
      required: [true, "Email is Requires"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: [true, "Email Already Exist"],
    },
    password: {
      type: String,
      required: [true, "must provide Password"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      level: this.level,
      email: this.email,
      category: nameCate,
      lastName: this.lastName,
      isActive: true
      // isverified: this.isverified
    },
    process.env.JWT_SEC,
    { expiresIn: "3d" }
  );
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch
}
userSchema.methods.getCategory = async function() {
  const cate = await Category.find(this.category);
  cate.forEach(element => {
    nameCate = element.Category,
    console.log(nameCate);
  });
}

module.exports = mongoose.model("User", userSchema);
