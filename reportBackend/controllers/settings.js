const express = require("express");
const Auth = require("../models/Auth");
const Settings = require("../models/Settings");

// CREATING OF LOG
const saveSettings = async (req, res) => {
  // get the user through Params
  const userId = req.params.id;
  const user = await Auth.findById(userId);
  const newSetting = new Settings({
    SetBy: user,
    day: req.body.day,
    numberOfreminder: req.body.numberOfreminder,
    message: req.body.message,
    startday: req.body.startday,
    record: req.body.record,
  });
  try {
    const setting = await (await newSetting.save()).populate("SetBy");
    res.status(200).json({
      success: true,
      data: {
        setting,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL LOGS
const getsettingss = async (req, res) => {
  try {
    const settings = await Settings.find().populate("SetBy");
    res.status(200).json({
      success: true,
      data: {
        settings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Settings
const updatesettings = async (req, res) => {
  const id = req.params.id;
  try {
    const settings = await Settings.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("SetBy");
    res.status(200).json({
      success: true,
      data: {
        settings,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Update Settings
const deletesettings = async (req, res) => {
  const id = req.params.id;
  try {
    await Settings.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Setting Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  saveSettings,
  getsettingss,
  updatesettings,
  deletesettings,
};
