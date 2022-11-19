const mongoose = require("mongoose");

// THE CATEGORY SCHEMA
const categorySchema = mongoose.Schema({
  Category: {
    type: String,
  },
},{timestamps: true});

module.exports = mongoose.model("Category", categorySchema);
