// IMPORTING THE MODULE 
const express = require("express");
const http = require("http");
const connectDb = require("./connection/connectDB");
const authRoute = require("./routes/auth");
const reportRoute = require("./routes/selfReview");
const userRoute = require("./routes/user");
const userreportRoute = require("./routes/report");
const notifiactionRoute = require("./routes/notification");
const adminRemarkRoute = require("./routes/remark");
const userReplyRoute = require("./routes/reply");
const userReplyRemarkRoute = require("./routes/remarkreply");
const admincommentReplyRoute = require("./routes/replyComment");
const settingsRoute = require("./routes/settings");
const categoryRoute = require("./routes/category")
const logRoute = require("./routes/logs")
const cors = require("cors");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages")
// const remindercontrol = require('./controllers/remindercontroller')
// INITIALIZE THE APP
const app = express();
const server = http.createServer(app);

// SOCKET.IO 
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// RUN WHEN CLIENT CONNECT
io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected...`);

  socket.on("message", (data) => {
    socket.broadcast.emit("message:recieved", formatMessage(data));
    const dataArray = [];
    dataArray.push(data);
    // const newChat = new Chats({
    //   chats: dataArray,
    // });
    // const saveChats = newChat.save();
    console.log(dataArray);
    // module.exports.chatsSch = async (req, res) => {
    //     try {
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
  });
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} Left...`);
  });
});

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/v1/review/auth", authRoute);
app.use("/api/v1/review/report", reportRoute);
app.use("/api/v1/review/users", userRoute);
app.use("/api/v1/review/userreport", userreportRoute);
app.use("/api/v1/review/notification", notifiactionRoute);
app.use("/api/v1/review/adminRemark", adminRemarkRoute);
app.use("/api/v1/review/userReply", userReplyRoute);
app.use("/api/v1/review/userremarkReply", userReplyRemarkRoute);
app.use("/api/v1/review/admincommentReply", admincommentReplyRoute);
app.use("/api/v1/review/categoryRoute", categoryRoute);
app.use("/api/v1/review/logRoute", logRoute);
app.use("/api/v1/review/settings", settingsRoute);

// remindercontrol.reminder_post()
const port = process.env.PORT || 5000;

// Start Server
const start = async () => {
  try {
    await connectDb();
    app.listen(
      port,
      console.log(
        `Server Listening on Port ${port} and Database connected Successfully`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

start();
