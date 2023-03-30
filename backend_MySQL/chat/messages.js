const db = require("../mySql");
const uniqid = require("uniqid");

async function allUsers(req, res) {
  const sqlQuery = `SELECT * FROM users WHERE email != '${req.params.email}'`;
  db.query(sqlQuery, (err, response) => {
    if (!err) {
      res.status(200).send({
        responseStatus: "SUCCESS",
        error: "",
        data: response,
        request: "OK",
        message: "Users Fetched Successfully",
      });
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "",
        data: err,
        request: "OK",
        message: "Something went wrong",
      });
    }
  });
}

async function sendMessage(req, res) {
  const sqlQuery = `INSERT INTO chats (_id, message, sender, receiver, time) VALUES ('${uniqid()}', ?, ?, ?, ?)`;
  db.query( 
    sqlQuery,
    [req.body.message, req.body.sender, req.body.receiver, req.body.time],
    (err, response) => {
      if (!err) {
        res.status(201).send({
          responseStatus: "SUCCESS",
          error: "",
          data: response,
          request: "OK",
          message: "Message Sent Successfully",
        });
      } else {
        res.status(500).send({
          responseStatus: "FAILED",
          error: "",
          data: err,
          request: "OK",
          message: "Something went wrong",
        });
      }
    }
  );
}

async function receiveMessage(req, res) {
  const sqlQuery = `SELECT * FROM chats WHERE sender = '${req.params.sender}' AND receiver = '${req.params.receiver}'`;
  db.query(sqlQuery, (err, response) => {
    if (!err) {
      res.status(200).send({
        responseStatus: "SUCCESS",
        error: "",
        data: response,
        request: "OK",
        message: "Message Find Successfully",
      });
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "",
        data: err,
        request: "OK",
        message: "Something went wrong",
      });
    }
  });
}

module.exports = { allUsers, sendMessage, receiveMessage };
