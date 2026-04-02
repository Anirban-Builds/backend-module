import { Router } from "express"
import {
    GithubLogin,
    GithubCurrentUser,
    LogoutGithubUser} from "../controllers/githubuser.controller.js"
import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser,
    checkUsername,
    updatePassword,
    updateCoverImage,
    LinkGithubUser,
    UnLinkGithubUser } from "../controllers/user.controller.js"
import { verifyGithubJWT, verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
const UserRouter = Router()

//routes
UserRouter.route('/gh-login').get(GithubLogin)
UserRouter.route('/gh-users').get(verifyGithubJWT, GithubCurrentUser)
UserRouter.route('/gh-logout').get(verifyGithubJWT, LogoutGithubUser)
UserRouter.route('/gh-link').patch(verifyJWT, LinkGithubUser)
UserRouter.route('/gh-unlink').patch(verifyJWT, UnLinkGithubUser)
UserRouter.route('/login').post(loginUser)
UserRouter.route('/signup').post(upload.single("coverimage"), registerUser)
UserRouter.route('/logout').get(verifyJWT, logoutUser)
UserRouter.route('/users').get(verifyJWT, getCurrentUser)
UserRouter.route('/check-uname').get(checkUsername)
UserRouter.route('/update-pwd').patch(verifyJWT, updatePassword)
UserRouter.route('/update-cover-image').patch(verifyJWT, upload.single("coverimage"), updateCoverImage)

export default UserRouter