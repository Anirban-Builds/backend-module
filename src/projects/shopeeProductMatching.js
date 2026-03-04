import AsyncHandler from '../utils/AsyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { OK } from '../constants.js'
import FormData from 'form-data'
import fs from "fs"
import { promisify } from 'util'
import fetch from 'node-fetch'

const projectSPM = AsyncHandler(async(req, res) => {
    const HF_URL = "https://anirban0011-multimodal-shopee-finetune.hf.space/predict"
    const {projDesc1, projDesc2} = req.body

    if(!req.files){
        throw new ApiError(400, "Files missing")
    }
    const form = new FormData()

    for (const file of req.files) {
        form.append('files', fs.createReadStream(file.path), file.originalname)
    }

    form.append('texts', projDesc1)
    form.append('texts', projDesc2)

    const length = await promisify(form.getLength).bind(form)()

    const headers = {
    ...form.getHeaders(),
    'Content-Length': length
    }
    const pred = await fetch(HF_URL, {
        method : "POST",
        headers : headers,
        body : form
    })

    if(!pred.ok){
        throw new ApiError(400, "Huggingface error")
    }
    const result = await pred.json()

     for (const file of req.files) {
     if (fs.existsSync(file.path)) {
    fs.unlinkSync(file.path)
    }
    }

     return res.status(OK).json(
        new ApiResponse(OK, result, "Project run successfully")
    )
})

export default projectSPM