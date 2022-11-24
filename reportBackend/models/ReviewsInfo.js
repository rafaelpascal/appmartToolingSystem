const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  goals: {
    type: String,
    required: true,
    Propercase: true,
  },
  accomplishment: {
    type: String,
    required: true,
    Propercase: true,
  },
  workingWithothers: {
    type: String,
    required: true,
    Propercase: true,
  },
  mythoughts: {
    type: String,
    required: true,
    Propercase: true,
  },
  submissionDate: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    // required: [true, "Category is Requires"],
  },
},{timestamps: true});

const ReviewInfo = mongoose.model("Report", ReviewSchema);

module.exports = ReviewInfo;
