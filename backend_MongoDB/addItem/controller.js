import itemDB from "../schema/additem";
import excelJS from "exceljs";

export async function addItem(req, res) {
  // console.log(req.body)
  const response = await itemDB.insertMany([req.body]);
  // console.log(response)
  if (response) {
    res.status(201).send({
      responseStatus: "SUCCESS",
      error: "",
      data: response[0],
      request: "OK",
      message: "Iteam Added Successfully",
    });
  } else {
    res.status(500).send({
      responseStatus: "FAILED",
      error: "Somethig Went Wrong",
      data: null,
      request: "OK",
      message: "",
    });
  }
}

export async function getAllItem(req, res) {
  // console.log(req.body)
  let body = {
    email: req.body.email,
  };
  const response = await itemDB.find(body);
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
  if (response) {
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
      data: null,
      request: "OK",
      message: "",
    });
  }
}

export async function editItem(req, res) {
  // console.log(req.body)

  const response = await itemDB.updateOne({ _id: req.body._id }, req.body);
  // console.log(response)
  if (response) {
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
      data: null,
      request: "OK",
      message: "",
    });
  }
}

export async function deleteItem(req, res) {
  // console.log(req.params)
  const response = await itemDB.deleteOne({ _id: req.params._id });
  // console.log(response)
  if (response) {
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
      data: null,
      request: "OK",
      message: "",
    });
  }
}

export async function downloadExcelFile(req, res) {
  // console.log(req.body)
  let body = {
    email: req.body.email,
  };
  const response = await itemDB.find(body);
  let page = req.body.page;
  let limit = req.body.limit;
  let result = response.splice(page * limit, limit);
  // result.map((ele) => {
  //   return {
  //     "title": ele.title,
  //     "description": ele.description,
  //     // "email": ele.email,
  //     "time": ele.time,
  //   };
  // });
  if (response) {
    // const workbook = new excelJS.Workbook(); // Create a new workbook
    // const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
    // const path = "./downloadFileTemplate"; // Path to download excel
    // Column for data in excel. key must match data key
    // {
    //     "_id": "6418777a1bb8726906a95e7f",
    //     "title": "Demo",
    //     "description": "Demo",
    //     "email": "sarvargulia7@gmail.com",
    //     "time": "2023-03-20T15:10:50.936Z",
    //     "totalRecords": 2
    // }
    // worksheet.columns = [
    //   { header: "S no.", key: "s_no", width: 10 },
    //   { header: "Title", key: "title", width: 15 },
    //   { header: "Description", key: "description", width: 30 },
    //   { header: "Email Id", key: "email", width: 25 },
    //   { header: "Time", key: "time", width: 20 },
    // ];
    // // Looping through User data
    // let counter = 1;
    // result.forEach((item) => {
    //   item.s_no = counter;
    //   worksheet.addRow(item); // Add data in worksheet
    //   counter++;
    // });
    // // Making first line in excel bold
    // worksheet.getRow(1).eachCell((cell) => {
    //   cell.font = { bold: true };
    // });
    // await workbook.xlsx.writeFile(`${path}/ListItemTemp.xlsx`)
    res.status(200).send({
      responseStatus: "SUCCESS",
      error: "",
      data: result,
      request: "OK",
      message: "Iteam Recieved Successfully",
    });
  } else {
    res.status(500).send({
      responseStatus: "FAILED",
      error: "Somethig Went Wrong",
      data: null,
      request: "OK",
      message: "",
    });
  }
}
