const Auth = require("../models/Auth");
const Report = require("../models/ReviewsInfo");
//const bcrypt = require('bcrypt');

module.exports.review_post = async (req, res) => {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();
  let name = month[d.getMonth()];
  console.log('name', name);

  const userId = req.user.id;
  // const riderId = req.user.id;
  const idUser = await Auth.findById(userId);

  //Validation
  const newReport = new Report({
    createdBy: idUser,
    goals: req.body.goals,
    accomplishment: req.body.accomplishment,
    workingWithothers: req.body.workingWithothers,
    mythoughts: req.body.mythoughts,
    year: req.body.year,
    month: req.body.month,
    submissionDate: name
  });
  if (!newReport) {
    return res.status(200).json({
      errcode: "02",
      message: "Fields cannot be empty",
    });
  } else {
    try {
      // insert report into db
      const report = await newReport.save();
      if (!report) {
        return res.status(200).json({
          errcode: "05",
          message: "Unable to add review info",
        });
      }
      return res.status(200).json({
        code: "00",
        message: report,
      });
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        errcode: "06",
        message: err,
      });
    }
  }
};

// MAKE A COMMENT ON REPORT
module.exports.remark = async (req, res) => {
  await res.send("This is A REMARK");
};

// GET ALL REPORT
module.exports.review_getall = async (req, res) => {
  // const userId = req.user.id;
  // const idUser = await Auth.findById(userId);
  try {
    const report = await Report.find({ createdBy: req.user.id }).populate(
      "createdBy"
    );
    if (!report) {
      return res.status(200).json({
        errcode: "10",
        message: " review info does not exit",
      });
    }
    return res.status(200).json({
      code: "00",
      data: { report, nbHits: report.length }
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errcode: "12",
      message: err,
    });
  }
};

// GET A SINGLE REPORT
module.exports.review_getone = async (req, res) => {
  const id = req.params.id;

  try {
    const report = await Report.findById(id).populate("createdBy");
    if (!report) {
      return res.status(200).json({
        errcode: "11",
        message: " review info does not exit",
      });
    }
    return res.status(200).json({
      code: "00",
      data: report,
    });
  } catch (err) {
    return res.status(500).json({
      errcode: "12",
      message: err,
    });
  }
};

// const getasingleReport = (req, res) => {
//   res.send("This is a view")
// }

// module.exports = {getasingleReport}
