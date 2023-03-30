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
import { allUsers, receiveMessage, sendMessage } from "./chat/messages.js";

dotenv.config();
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// // Socket.IO
io.on("connection", (socket) => {
  // // to join room wiyh other user
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  // // use socket.broadcast.emit   ( To send all connected user  )
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  // // use socket.to(**room from received data**).emit   ( To send message to connected user in the room )
  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data.message);
  // });

  // // when user disconnected
  socket.on("disconnect", () => {
    // console.log(`Socket ${socket.id} disconnected`);
  });
});

app.get("/", () => {
  console.log("get called");
});

// // Auth
app.post("/register", register);
app.post("/login", login);
app.post("/getSecurityQuestion", getSecurityQuestion);
app.post("/checkSecurityAnswer", checkSecurityAnswer);
app.patch("/changePassword", changePassword);
app.post("/validateToken", validateToken);

// Middleware to verify Users API request by velitate authorization token
app.use((req, res, next) => {
  let token = req.headers.authorization;
  try {
    let verifiedToken = verifytoken(token);
    if (verifiedToken) {
      next();
    } else {
      res.status(401).send({
        responseStatus: "FAILED",
        error: "Unauthorized User",
        data: null,
        request: "OK",
        message: "",
      });
    }
  } catch {
    res.status(401).send({
      responseStatus: "FAILED",
      error: "Unauthorized User",
      data: null,
      request: "OK",
      message: "",
    });
  }
});

// // Routes for TODO CRUD oprations
app.post("/additem", addItem);
app.post("/getAllItem", getAllItem);
app.put("/edititem", editItem);
app.delete("/deleteitem/:_id", deleteItem);

// // Routes for Chating
app.get("/chat/allusers/:email", allUsers)
app.post("/chat/sendMessage", sendMessage)
app.get("/chat/receiveMessage/:sender/:receiver", receiveMessage)


connectToDB();

const port = process.env.PORT;
server.listen(port, () => {
  console.log("Backend is running on 8000", port);
});
