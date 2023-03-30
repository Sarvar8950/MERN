import registerschema from '../schema/register.js'
import { verifytoken, generateToken } from './jwtservices.js'
import { encryptpass, dcryptpass } from './bcrypt.js'

async function checkalreadyUser(email) {
    const response = await registerschema.findOne({ "email": email })
    if (response) {
        return response;
    } else {
        return false;
    }
}

export async function register(req, res) {
    const body = req.body
    let userexists = await checkalreadyUser(body.email)
    if (userexists) {
        res.status(409).send({
            responseStatus: "FAILED",
            error: "User Already Registered",
            data: null,
            request: "OK",
            message:""
        })
    } else {
        const encpass = encryptpass(body.password)
        body.password = encpass
        const encsecans = encryptpass(body.securityAnswer)
        body.securityAnswer = encsecans
        const response = await registerschema.insertMany([body])
        response[0].password = ""
        response[0].securityAnswer = ""
        res.status(201).send({
            responseStatus: "SUCCESS",
            error: "",
            data: response,
            request: "OK",
            message: "User Registered Successfully"
        })
    }
}

export async function login(req, res) {
    const email = req.body.email
    const response = await checkalreadyUser(email)
    if (!response) {
        res.status(501).send({
            responseStatus: "FAILED",
            error: "Invalid Mail",
            message: "",
            data: null,
            request: "OK",
            token: null,
            _id : null
        })
        return;
    }
    const isvalidpass = dcryptpass(req.body.password, response.password)
    if (isvalidpass) {
        let payload = {
            email : response.email,
            firstName : response.firstName,
            lastName : response.lastName,
            securityQuestion : response.securityQuestion,
            _id : response._id
        }
        const token = generateToken(payload);
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            message: "Login Successfully",
            data: payload,
            request: "OK",
            token: token
        });
    } else {
        res.status(400).send({
            responseStatus: "FAILED",
            error: "Password Do Not Match",
            message: "",
            data: null,
            request: "OK",
            token: null
        })
    }

}

export async function getSecurityQuestion(req, res) {
    const response = await registerschema.findOne({ "email": req.body.email })
    if (response) {
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            message: "Your Mail Match Successfully",
            data: { securityQuestion: response.securityQuestion },
            request: "OK"
        })
    } else {
        res.status(404).send({
            responseStatus: "FAILED",
            error: "User Not Found",
            message: "",
            data: null,
            request: "OK"
        })

    }
}

export async function checkSecurityAnswer(req, res) {
    const response = await registerschema.findOne({ "email": req.body.email })
    const isvalidpass = dcryptpass(req.body.securityAnswer, response.securityAnswer)
    if (isvalidpass) {
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            data: null,
            message: "Security Answer Match Sucessfully",
            request: "OK"
        })
    } else {
        res.status(401).send({
            responseStatus: "FAILED",
            error: "Security Answer Do Not Match",
            data: null,
            message: "",
            request: "OK"
        })
    }
}

export async function changePassword(req, res) {
    let data = req.body
    data.password = encryptpass(data.password)
    const response = await registerschema.updateOne({email : req.body.email}, data)
    if (response) {
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            message: "Password Update Sucessfully",
            data: null,
            request: "OK"
        })
    } else {
        res.status(401).send({
            responseStatus: "FAILED",
            error: "Something Went Wrong",
            message: "",
            data: null,
            request: "OK"
        })
    }
}

export async function validateToken(req, res) {
    let data = req.body
    let response = verifytoken(data.token)
    if (response) {
        res.status(200).send({
            responseStatus: "SUCCESS",
            error: "",
            message: "Token Verified Successfully",
            data: null,
            request: "OK"
        })
    } else {
        res.status(401).send({
            responseStatus: "FAILED",
            error: "Token Not Verified",
            message: "",
            data: null,
            request: "OK"
        })
    }
}


