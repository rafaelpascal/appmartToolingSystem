const express = require("express");
const Auth = require("../models/Auth");
const Log = require("../models/Log");

// CREATING OF LOG 
const log = async (req, res) => {
  // get the user through Params
  const userId = req.params.id;
  const user = await Auth.findById(userId); //Getting the id of the user that is loged in to get the activities he is performing
  const newLog = new Log({
    user:user,
    activity: req.body.activity,
    date: new Date,
  })
  try {
    const log = await (await newLog.save()).populate("user");
    res.status(200).json({
      success: true,
      data: {
        log,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL LOGS
const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().populate("user");
    res.status(200).json({
      success: true,
      data: { logs, nbHits: logs.length }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  log,
  getLogs,
};
