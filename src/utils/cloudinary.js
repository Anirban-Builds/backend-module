import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const cloudUpload = async(localFilePath, folder) =>{
    try{
        if(!localFilePath) return "file not found on server"
        const res = await cloudinary.uploader.upload(localFilePath,
            {   folder : folder,
                resource_type:"image",
            })
        fs.unlinkSync(localFilePath)
        return res
    }
    catch(error){
        console.log("Error in file upload : ", error)
        fs.unlinkSync(localFilePath)
        return null
    }

}

export default cloudUpload
