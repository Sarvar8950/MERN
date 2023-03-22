import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./mongodb.js";
import {
  register,
  login,
  getSecurityQuestion,
  checkSecurityAnswer,
  changePassword,
  validateToken,
} from "./auth/auth.controller.js";
import {
  addItem,
  getAllItem,
  editItem,
  deleteItem,
} from "./addItem/controller.js";
import { verifytoken } from "./auth/jwtservices";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Socket.IO
io.on("connection", (socket) => {
  console.log("Socket Id", socket.id);

  // socket.on("receive_message", (message) => {
  //   console.log(message)
  //   io.emit("message", message);
  // });
  socket.on("send_message", (message) => {
    console.log(message)
    socket.to(message).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

app.get("/", () => {
  console.log("get called");
});

// Auth
app.post("/register", register);
app.post("/login", login);
app.post("/getSecurityQuestion", getSecurityQuestion);
app.post("/checkSecurityAnswer", checkSecurityAnswer);
app.patch("/changePassword", changePassword);
app.post("/validateToken", validateToken);

// app.use((req, res, next) => {
//   // console.log(req.headers.authorization)
//   let token = req.headers.authorization;
//   try {
//     let verifiedToken = verifytoken(token);
//     // console.log(verifiedToken)
//     if (verifiedToken) {
//       next();
//     } else {
//       res.status(401).send({
//         responseStatus: "FAILED",
//         error: "Unauthorized User",
//         data: null,
//         request: "OK",
//         message: "",
//       });
//     }
//   } catch {
//     // console.log("catch block")
//     res.status(401).send({
//       responseStatus: "FAILED",
//       error: "Unauthorized User",
//       data: null,
//       request: "OK",
//       message: "",
//     });
//   }
//   // next()
// });

// Add Items To DB
app.post("/additem", addItem);
app.post("/getAllItem", getAllItem);
app.put("/edititem", editItem);
app.delete("/deleteitem/:_id", deleteItem);




connectToDB();
const port = process.env.PORT;
server.listen(port, () => {
  console.log("Backend is running on 8000", port);
});


