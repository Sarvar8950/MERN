import jwt from 'jsonwebtoken'

const secret_key = "SECRET_KEY"

export function generateToken(payload) {
    let token = jwt.sign(payload,secret_key)
    return token
}

export function verifytoken(token) {
    let data = jwt.verify(token, secret_key)
    return data
}
