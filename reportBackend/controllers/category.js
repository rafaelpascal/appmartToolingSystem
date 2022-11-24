const express = require("express");
const Category = require("../models/Category");

// CREATING OF CATEGORY BY THE ADMIN
const Createcategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).json({
      success: true,
      data: {
        category,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL CATEGORY
const getcategory = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({
      success: true,
      data: {
        categories,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  Createcategory,
  getcategory,
};
