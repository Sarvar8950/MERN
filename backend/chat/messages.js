import chatDB from "../schema/chat";
import registerschema from "../schema/register";

export async function allUsers(req, res) {
  const response = await registerschema.find({});
  if (response) {
    let arr = [];
    response.map((ele) => {
      if (ele.email != req.params.email) {
        arr.push({
          email: ele.email,
          firstName: ele.firstName,
          lastName: ele.lastName,
          _id: ele._id,
        });
      }
    });
    res.status(200).send({
      responseStatus: "SUCCESS",
      error: "",
      data: arr,
      request: "OK",
      message: "Users Fetched Successfully",
    });
  } else {
    res.status(500).send({
      responseStatus: "FAILED",
      error: "",
      data: [],
      request: "OK",
      message: "Something went wrong",
    });
  }
}

export async function sendMessage(req, res) {
  const response = await chatDB.create(req.body);
  if (response) {
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
      data: [],
      request: "OK",
      message: "Something went wrong",
    });
  }
}

export async function receiveMessage(req, res) {
  const response = await chatDB.find({receiver:req.params.receiver});
  if (response) {
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
      data: [],
      request: "OK",
      message: "Something went wrong",
    });
  }
}
