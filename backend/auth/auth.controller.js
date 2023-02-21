import registerschema from '../schema/register.js'
import { verifytoken, generateToken } from './jwtservices.js'
import { encryptpass, dcryptpass } from './bcrypt.js'


async function checkalreadyUser(email) {
    const response = await registerschema.findOne({ "email": email })
    if (response) {
        return true;
    } else {
        return false;
    }
}

export const register = async (req, res) => {
    const body = req.body
    let userexists = await checkalreadyUser(body.email)
    if (userexists) {
        res.status(409).send({
            responseStatus: "FAILED",
            error : "User Already Registered",
            data: null,
            request: "OK"
        })
    } else {
        const encpass = encryptpass(body.password)
        body.password = encpass
        const encsecans = encryptpass(body.securityAnswer)
        body.securityAnswer = encsecans
        console.log(body)
        const response = await registerschema.insertMany([body])
        response[0].password = ""
        response[0].securityAnswer = ""
        res.status(201).send({
            responseStatus: "SUCCESS",
            error:"",
            data: response,
            request: "OK"
        })
    }
}

export async function login(req, res, next) {
    const email = req.body.email
    const response = await registerschema.findOne({ "email": email })
    // console.log(response)
    if (!response) {
        res.status(501).send("Invalid Mail")
        return;
    }
    const isvalidpass = dcryptpass(req.body.password, response.password)
    if (isvalidpass) {
        let userdetails = {
            email: response.email,
            password: "",
        }
        const token = generateToken(userdetails);
        // console.log(token)
        res.status(200).send([{ "token": token, "userdata": response }]);
        // console.log('gg', [{"token" : token, "userdata" : response}])
    } else {
        console.log("Something is wrong")
        res.status(400).send("Data not matched")
    }

}


