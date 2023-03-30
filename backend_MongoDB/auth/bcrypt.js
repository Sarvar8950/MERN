import bcrypt from 'bcrypt'

export function encryptpass(plainpass) {
    const encpass = bcrypt.hashSync(plainpass,10)
    return encpass
}

export function dcryptpass(plainpass,encriptedpass) {
    const encpass = bcrypt.compareSync(plainpass,encriptedpass)
    return encpass
}
