import { forwardMail } from "../services/ReceiveMail.js"
import Asynchandler from "../utils/AsyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { OK } from "../constants.js"

const handleInboxMail = Asynchandler(async(req, res)=>{
     const {data} = req.body
     const payload = data?.data || data
    if (!payload?.email_id) {
    throw new ApiError(400, "Missing sender email")
    }
    await forwardMail(payload)

    return res
        .status(OK)
        .json(
            new ApiResponse
            (OK,
            {},
            "Email forwarded successfully !"
            ))

})

export {handleInboxMail}