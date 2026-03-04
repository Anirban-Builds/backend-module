import { Router} from "express"
import {
    Addproject,
    Getprojects,
    GetprojTitles,
    RunProject} from "../controllers/project.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const projectRouter = Router()

projectRouter.route('/addproject').post(upload.single("projImage"), Addproject)
projectRouter.route('/fetchproject').get(Getprojects)
projectRouter.route('/fetch-titles').get(GetprojTitles)
projectRouter.route('/submit/:projectid').post(upload.any(), RunProject)
export default projectRouter