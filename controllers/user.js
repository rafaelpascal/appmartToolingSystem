const express = require("express");
const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");

// GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const Allusers = await Auth.find({}).populate("category");
    if (!Allusers) {
      res.status(400).json({
        success: false,
        message: "Something Went Wrong Please Try Again",
      });
    } else {
      // res.status(200).json({ success: true, users });
      res
        .status(200)
        .json({ success: true, data: { Allusers, nbHits: Allusers.length } });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET A SINGLE USER USING ID
const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Auth.findById(id).populate("category");
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not Found",
      });
    } else {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE USER
const editUser = async (req, res) => {
  const id = req.params.id;
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  const updateUser = {
    firstName: req.body.firstName,
    otherName: req.body.otherName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    level: req.body.level,
    unit: req.body.unit,
    category: req.body.category,
    // password : await bcrypt.hash(req.body.password, 10),
  };
  try {
    const user = await Auth.findByIdAndUpdate(id, updateUser, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(500).json({
        success: false,
        message: "User Not Updated Please try Again",
      });
    } else {
      res.status(200).json({ success: true, user });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DEACTIVATE USER
const deactivateUser = async (req, res) => {
  const id = req.params.id;
  const user = await Auth.findById(id);
  // const userDetails = find
  try {
    user.isActive = false;
    user.save();
    res.status(200).json({
      success: true,
      data: {
        user,
        message: "User Deactivated Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ACTIVATE USER
const activateUser = async (req, res) => {
  const id = req.params.id;
  const user = await Auth.findById(id);
  // const userDetails = find
  try {
    user.isActive = true;
    user.save();
    res.status(200).json({
      success: true,
      data: {
        user,
        message: "User Deactivated Successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUser,
  getUser,
  editUser,
  deactivateUser,
  activateUser,
};
