import mongoose, {Schema} from 'mongoose'
import TokenCreate from '../utils/TokenCreate.js'
import { GH_LOGO } from '../constants.js'

const GithubUserSchema = new Schema({
    username : {type: String,
        default: "",
        required : true},
    ghEmail : {type : String,
        default: "",
        lowercase : true,
        required : true},
    coverimage : {type : String, default: GH_LOGO},
    avatar : {type : String, default: ""},
    masteruser: {type: Boolean, default: false},
    usertype : {
        type : [Boolean],
        default : () => Array(2).fill(false)
    },
    refreshtoken : {type: String}
}, { versionKey: false })


GithubUserSchema.methods.genAccessToken = function () {
    return TokenCreate(
        {
            _id: this._id,
            ghEmail : this.ghEmail,
            username: this.username,
        },
        true
)}

GithubUserSchema.methods.genRefreshToken = function () {
    return TokenCreate(
        {
            _id : this._id
        },
        false
)}

const GithubUser = mongoose.model('GithubUsers', GithubUserSchema)

export {GithubUser}