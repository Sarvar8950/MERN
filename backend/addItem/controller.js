import itemDB from "../schema/additem"

export async function addItem(req, res) {
    // console.log(req.body)
    const response = await itemDB.insertMany([req.body])
    // console.log(response)
    if(response) {
        res.status(201).send({
            responseStatus: "SUCCESS",
            error: "",
            data: response[0],
            request: "OK",
            message:"Iteam Added Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

export async function getAllItem(req, res) {
    // console.log(req.body)
    let body = {
        email : req.body.email
    }
    const response = await itemDB.find(body)
    let page = req.body.page
    let limit = req.body.limit
    let totalRecords = response.length
    let result = response.splice(page*limit, limit)
    let arr = result.map(ele => {
        return {
            _id : ele._id,
            title : ele.title,
            description : ele.description,
            email : ele.email,
            time : ele.time,
            totalRecords : totalRecords
        }
    })
    if(response) {
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            data: arr,
            request: "OK",
            message:"Iteam Recieved Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

export async function editItem(req, res) {
    // console.log(req.body)

    const response = await itemDB.updateOne({_id:req.body._id}, req.body)
    // console.log(response)
    if(response) {
        res.status(204).send({
            responseStatus: "SUCCESS",
            error: "",
            data: response[0],
            request: "OK",
            message:"Iteam Updated Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}

export async function deleteItem(req, res) {
    // console.log(req.params)
    const response = await itemDB.deleteOne({_id:req.params._id})
    // console.log(response)
    if(response) {
        res.status(204).send({
            responseStatus: "SUCCESS",
            error: "",
            data: {
                Message : "Data Deleted"
            },
            request: "OK",
            message:"Iteam Deleted Successfully"
        })
    } else {
        res.status(500).send({
            responseStatus: "FAILED",
            error: "Somethig Went Wrong",
            data: null,
            request: "OK",
            message:""
        })
    }
}