const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Auth");
const UserOTPverification = require("../models/UserOTPVerification");
const crypto = require("crypto");
const { sendMail } = require("../utils/mailServices");
const { makeEmailTemplate } = require("../utils/makeEmailTemplate");

// REGISTRATION: Creating of the user controler
const createAccount = async (req, res) => {
  const emailExist = await Admin.findOne({ email: req.body.email }); 
  const phoneExist = await Admin.findOne({ phone: req.body.phone });
  const passwrdgen = `Pass${crypto.randomBytes(4).toString("hex")}`; //Generating User password that will be sent to the user via Email address

  //  This if statement is used to check if the Email address and password already exist in the database
  if (emailExist || phoneExist) {
    res.status(409).json({
      status: "conflict",
      message: "Email Address or Phone number Already exist",
    });
  } else {
    const newUser = new Admin({
      firstName: req.body.firstName,
      otherName: req.body.otherName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      level: req.body.level,
      unit: req.body.unit,
      category: req.body.category,
      password: passwrdgen,
    });
    try {
      const user = await (await newUser.save()).populate("category");
      // Email the data to the user
      const mailData = {
        email: user.email,
        password:passwrdgen,
      };

      const message = makeEmailTemplate('loginDetails.html', mailData);
      const subject = 'Appmart Tooling System Login Credentials'
      sendMail( user.email, message, subject);
      // MAIL TO USER
      // let transporter = nodemailer.createTransport({
      //   service: "gmail",
      //   auth: {
      //     user: process.env.EMAIL,
      //     pass: process.env.PASSWORD,
      //   },
      // });
      // const mailOptions = {
      //   from: process.env.EMAIL,
      //   to: user.email,
      //   subject: "Password by Appmart Internal Tooling System",
      //   html:
      //     "<p><b>Your Login Details for Appmart Internal Tooling System</b><br><b>Email:</b>" +
      //     user.email +
      //     "<br><b>Password: </b> " +
      //     passwrdgen +
      //     ' <br><a href="http://localhost:4200/">Click here to login</a> </p>',
      // };
      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     return res
      //       .status(201)
      //       .json({ success: true, message: "Credentials sent to Email" });
      //   }
      // });
      const { password, ...otherInfo } = user._doc;
      res.status(201).json({ success: true, ...otherInfo });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  const userId = req.params.id;

  try {
    const { otp } = req.body;
    // const { userId, otp } = req.body;
    if (!userId || !otp) {
      res.status(404).json({ success: false, message: "Empty OTP Deatails" });
    } else {
      const userOTP = await UserOTPverification.find({ userId });
      if (!userOTP) {
        res.status(404).json({ success: false, message: "Invalid User" });
      } else {
        const { expiresAt } = userOTP[0];
        const hashedOTP = userOTP[0].otp;
        if (expiresAt < Date.now()) {
          await UserOTPverification.deleteMany({ userId });
          res.status(404).json({ success: false, message: "Code has Expired" });
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            res.status(404).json({
              success: false,
              message: "Invalid Code check your Inbox for the correct Code",
            });
          } else {
            await Admin.findByIdAndUpdate(
              { _id: userId },
              { isverified: true }
            );
            await UserOTPverification.deleteMany({ userId });
            res.status(200).json({
              success: true,
              message: "User Email Verified Successfully",
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CHANGE PASSWORD
const changePass = async (req, res) => {
  const userId = req.params.id;
  const updatePassword = {
    password: await bcrypt.hash(req.body.password, 10),
    loginCount: 1,
  };
  try {
    const changepssword = await Admin.findByIdAndUpdate(
      userId,
      updatePassword,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!changepssword) {
      res.status(500).json({
        success: false,
        message: "Password Not Updated Please try Again",
      });
    } else {
      res.status(200).json({ success: true, changepssword });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "Wrong Email Address" });
    } else {
      // CHECK USER ACTIVE STATUS
      if (user.isActive === false) {
        res
          .status(400)
          .json({ success: false, message: "You are not Authorized, contact Admin" });
      } else {
        // Check the Password
        const isPasswordCorrect = await user.comparePassword(password);
        await user.getCategory();
        if (isPasswordCorrect) {
          // Create Token
          const accessToken = user.createJWT();
          const { password, ...otherInfo } = user._doc;
          res
            .status(200)
            .json({ success: true, data: { ...otherInfo, accessToken } });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Wrong User Password" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {
  createAccount,
  verifyOTP,
  loginUser,
  changePass,
};
