import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDB from "./mongodb.js"
import {register, login, getSecurityQuestion, checkSecurityAnswer, changePassword, validateToken} from "./auth/auth.controller.js"


dotenv.config();
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({extended: true }))

app.get("/", () => {
    console.log("get called")
})
app.post("/register", register)
app.post("/login", login)
app.post("/getSecurityQuestion", getSecurityQuestion)
app.post("/checkSecurityAnswer", checkSecurityAnswer)
app.patch("/changePassword", changePassword)
app.post("/validateToken", validateToken)



connectToDB()
const port = process.env.PORT
app.listen(port, () => {
    console.log('Backend is running on 8000', port)
})