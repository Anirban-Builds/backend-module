import { Router} from "express"
import {
    Addproject,
    Getprojects,
    GetprojTitles} from "../controllers/project.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const projectRouter = Router()

projectRouter.route('/addproject').post(upload.single("projImage"), Addproject)
projectRouter.route('/fetchproject').get(Getprojects)
projectRouter.route('/fetch-titles').get(GetprojTitles)
export default projectRouter