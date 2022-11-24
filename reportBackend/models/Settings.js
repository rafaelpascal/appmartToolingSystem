const mongoose = require("mongoose");

// THE CATEGORY SCHEMA
const settingsSchema = mongoose.Schema(
  {
    SetBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    day: {
      type: String,
    },
    numberOfreminder: {
      type: String,
    },
    message: {
      type: String,
    },
    startday: {
      type: String,
    },
    record: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
