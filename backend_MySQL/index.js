// import Packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// import files
const mysqlDB = require("./mySql");
const {
  register,
  login,
  getSecurityQuestion,
  checkSecurityAnswer,
  changePassword,
} = require("./auth/auth.controler");
const {
  addItem,
  getAllItem,
  editItem,
  deleteItem,
} = require("./addItem/controller");
const { verifytoken } = require("./auth/jwtservices");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// // Auth
app.post("/register", register);
app.post("/login", login);
app.post("/getSecurityQuestion", getSecurityQuestion);
app.post("/checkSecurityAnswer", checkSecurityAnswer);
app.patch("/changePassword", changePassword);

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

// Connect to Database
mysqlDB;

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Backend is running on 8000", port);
});
