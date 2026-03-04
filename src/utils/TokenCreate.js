import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config({})

function TokenCreate(payload, accessToken=true) {
    return jwt.sign(
        payload,

    accessToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: accessToken ? process.env.ACCESS_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY
    })
}

export default TokenCreate

