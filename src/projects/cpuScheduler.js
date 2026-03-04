import Asynchandler from "../utils/AsyncHandler.js"
import { OK } from "../constants.js"
import fetch from "node-fetch"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
const ProjSchler = Asynchandler(async(req, res) => {

    const {algo, at, burst, prts, q} = req.body

    const HF_URL = `https://anirban0011-cpu-scheduler.hf.space/${algo}`

    const body = {
        ats: at.split(",").slice().map(x => Number(x)),
        bursts: burst.split(",").slice().map(x => Number(x)),
        prts: prts.split(",").slice().map(x => Number(x))
    }
    if(q > 0) body.q = q

    const pred = await fetch(HF_URL, {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)})

     if(!pred.ok){
          throw new ApiError(400, "Huggingface error")
    }

    const result = await pred.json()

     return res.status(OK).json(
        new ApiResponse(OK, result, "Project run successfully")
    )

})

export default ProjSchler