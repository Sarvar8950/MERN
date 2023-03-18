import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from "./mongodb.js"
import {register, login, getSecurityQuestion, checkSecurityAnswer, changePassword, validateToken} from "./auth/auth.controller.js"
import { addItem, getAllItem } from './addItem/controller.js';
import {verifytoken} from "./auth/jwtservices";


dotenv.config();
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({extended: true }))

app.get("/", () => {
    console.log("get called")
})

// Auth
app.post("/register", register)
app.post("/login", login)
app.post("/getSecurityQuestion", getSecurityQuestion)
app.post("/checkSecurityAnswer", checkSecurityAnswer)
app.patch("/changePassword", changePassword)
app.post("/validateToken", validateToken)


app.use((req, res, next) => {
    // console.log(req.headers.authorization)
    let token = req.headers.authorization
    try{
        let verifiedToken = verifytoken(token)
        // console.log(verifiedToken)
        if(verifiedToken) {
            next()
        } else {
            res.status(401).send({
                responseStatus: "FAILED",
                error: "Unauthorized User",
                data: null,
                request: "OK",
                message:""
            })
        }
    } catch {
        // console.log("catch block")
        res.status(401).send({
            responseStatus: "FAILED",
            error: "Unauthorized User",
            data: null,
            request: "OK",
            message:""
        })
    }
    // next()
})


// Add Items To DB
app.post("/additem", addItem)
app.post("/getAllItem", getAllItem)




connectToDB()
const port = process.env.PORT
app.listen(port, () => {
    console.log('Backend is running on 8000', port)
})