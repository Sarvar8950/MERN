const db = require("../mySql");
const uniqid = require("uniqid");

async function addItem(req, res) {
  const sqlQuery = `INSERT INTO todos (_id, title, description, email, time) VALUES ('${uniqid()}', ?, ?, ?, ?)`
  db.query(sqlQuery, [req.body.title, req.body.description, req.body.email, req.body.time], (err, response) => {
      if (!err) {
        res.status(201).send({
          responseStatus: "SUCCESS",
          error: "",
          data: response,
          request: "OK",
          message: "Iteam Added Successfully",
        });
      } else {
        res.status(500).send({
          responseStatus: "FAILED",
          error: "Somethig Went Wrong",
          data: err,
          request: "OK",
          message: "",
        });
      }
  })
}

async function getAllItem(req, res) {
  const sqlQuery = `SELECT * FROM todos WHERE email = '${req.body.email}'`;
  db.query(sqlQuery, (err, response) => {
    if (response) {
      let page = req.body.page;
      let limit = req.body.limit;
      let totalRecords = response.length;
      let result = response.splice(page * limit, limit);
      let arr = result.map((ele) => {
        return {
          _id: ele._id,
          title: ele.title,
          description: ele.description,
          email: ele.email,
          time: ele.time,
          totalRecords: totalRecords,
        };
      });
      res.status(200).send({
        responseStatus: "SUCCESS",
        error: "",
        data: arr,
        request: "OK",
        message: "Iteam Recieved Successfully",
      });
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "Somethig Went Wrong",
        data: err,
        request: "OK",
        message: "",
      });
    }
  });
}

async function editItem(req, res) {
  const sqlQuery = `UPDATE todos SET ? WHERE _id = '${req.body._id}'`;
  db.query(sqlQuery, [req.body], (err, response) => {
    if (!err) {
      res.status(204).send({
        responseStatus: "SUCCESS",
        error: "",
        data: response[0],
        request: "OK",
        message: "Iteam Updated Successfully",
      });
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "Somethig Went Wrong",
        data: err,
        request: "OK",
        message: "",
      });
    }
  });
}

async function deleteItem(req, res) {
  const sqlQuery = `DELETE FROM todos WHERE _id = '${req.params._id}'`;
  db.query(sqlQuery, (err, response) => {
    if (!err) {
      res.status(204).send({
        responseStatus: "SUCCESS",
        error: "",
        data: {
          Message: "Data Deleted",
        },
        request: "OK",
        message: "Iteam Deleted Successfully",
      });
    } else {
      res.status(500).send({
        responseStatus: "FAILED",
        error: "Somethig Went Wrong",
        data: err,
        request: "OK",
        message: "",
      });
    }
  });
}

module.exports = { addItem, getAllItem, editItem, deleteItem };
