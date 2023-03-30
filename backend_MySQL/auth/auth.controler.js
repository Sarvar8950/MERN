const { verifytoken, generateToken } = require("./jwtservices.js");
const { encryptpass, dcryptpass } = require("./bcrypt.js");
const db = require("../mySql");
const uniqid = require("uniqid");

async function register(req, res) {
  const body = req.body;
  var sqlQuery = `SELECT * FROM users WHERE email = '${body.email}'`;
  db.query(sqlQuery, (err, result) => {
    if (result.length > 0) {
      res.status(409).send({
        responseStatus: "FAILED",
        error: "User Already Registered",
        data: null,
        request: "OK",
        message: "",
      });
    } else {
      const encpass = encryptpass(body.password);
      body.password = encpass;
      const encsecans = encryptpass(body.securityAnswer);
      body.securityAnswer = encsecans;
      const sqlQuery = `INSERT INTO users (_id, firstName, lastName, password, email, securityQuestion, securityAnswer) VALUES ('${uniqid()}', ?, ?, ?, ?, ?, ?)`;
      db.query(
        sqlQuery,
        [
          body.firstName,
          body.lastName,
          body.password,
          body.email,
          body.securityQuestion,
          body.securityAnswer,
        ],
        (err, response) => {
          // pass data inside [] that will take ? space in command
          if (err) {
            res.status(500).send({
              responseStatus: "FAILED",
              error: "",
              data: err,
              request: "OK",
              message: "Something went wrong",
            });
          } else {
            res.status(201).send({
              responseStatus: "SUCCESS",
              error: "",
              data: response,
              request: "OK",
              message: "User Registered Successfully",
            });
          }
        }
      );
    }
  });
}

async function login(req, res) {
  const email = req.body.email;
  var sqlQuery = `SELECT * FROM users WHERE email = '${email}'`;
  db.query(sqlQuery, (err, result) => {
    if (result.length > 0) {
      console.log(result);
      result = result[0];
      const isvalidpass = dcryptpass(req.body.password, result.password);
      if (isvalidpass) {
        let payload = {
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          securityQuestion: result.securityQuestion,
          _id: result._id,
        };
        const token = generateToken(payload);
        res.status(200).send({
          responseStatus: "SUCCESS",
          error: "",
          message: "Login Successfully",
          data: payload,
          request: "OK",
          token: token,
        });
      } else {
        res.status(400).send({
          responseStatus: "FAILED",
          error: "Password Do Not Match",
          message: "",
          data: null,
          request: "OK",
          token: null,
        });
      }
    } else {
      res.status(501).send({
        responseStatus: "FAILED",
        error: "Invalid Mail",
        message: "",
        data: err,
        request: "OK",
        token: null,
        _id: null,
      });
    }
  });
}

async function getSecurityQuestion(req, res) {
  var sqlQuery = `SELECT * FROM users WHERE email = '${req.body.email}'`;
  db.query(sqlQuery, (err, result) => {
    if (result.length > 0) {
      res.status(200).send({
        responseStatus: "SUCCESS",
        error: "",
        message: "Your Mail Match Successfully",
        data: { securityQuestion: result[0].securityQuestion },
        request: "OK",
      });
    } else {
      res.status(404).send({
        responseStatus: "FAILED",
        error: "User Not Found",
        message: "",
        data: err,
        request: "OK",
      });
    }
  });
}

async function checkSecurityAnswer(req, res) {
  var sqlQuery = `SELECT * FROM users WHERE email = '${req.body.email}'`;
  db.query(sqlQuery, (err, result) => {
    if (result.length > 0) {
      const isvalidpass = dcryptpass(
        req.body.securityAnswer,
        result[0].securityAnswer
      );
      if (isvalidpass) {
        res.status(200).send({
          responseStatus: "SUCCESS",
          error: "",
          data: null,
          message: "Security Answer Match Sucessfully",
          request: "OK",
        });
      } else {
        res.status(401).send({
          responseStatus: "FAILED",
          error: "Security Answer Do Not Match",
          data: null,
          message: "",
          request: "OK",
        });
      }
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "Something went wrong",
        data: err,
        message: "",
        request: "OK",
      });
    }
  });
}

async function changePassword(req, res) {
  let data = req.body;
  data.password = encryptpass(data.password);
  var sqlQuery = `UPDATE users SET password = ? WHERE email = '${req.body.email}'`;
  db.query(sqlQuery, [data.password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        responseStatus: "FAILED",
        error: "Something Went Wrong",
        message: "",
        data: err,
        request: "OK",
      });
    } else {
      res.status(200).send({
        responseStatus: "SUCCESS",
        error: "",
        message: "Password Update Sucessfully",
        data: null,
        request: "OK",
      });
    }
  });
}

module.exports = {
  register,
  login,
  getSecurityQuestion,
  checkSecurityAnswer,
  changePassword,
};
