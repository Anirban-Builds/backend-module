import mongoose, {Schema} from 'mongoose'
import bcrypt from "bcrypt"
import TokenCreate from '../utils/TokenCreate.js'

const UserSchema = new Schema({
    coverimage : {type: String,
                    required : true},
    username :
            {type: String,
                unique: true,
                lowercase: true,
                 trim: true,
                index: true,
                required: true},
    email : {type: String,
                unique: true,
                 trim: true,
                 lowercase : true,
                index: true,
                required: true},
    ghEmail : {type: String,
                lowercase : true,
                default: ""},
    avatar : {type : String, default: ""},
    password : {type: String,
                required : true},
    masteruser: {type: Boolean,
                default: false},
    usertype : {
        type : [Boolean],
        default : () => Array(2).fill(false)
    },
    refreshtoken : {type: String}
}, { versionKey: false})

UserSchema.pre("save", async function (next) {
    if(this.isModified("password"))
        {
            this.password = await bcrypt.hash(this.password, 10)
        }
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.genAccessToken = function () {
    return TokenCreate(
        {
            _id: this._id,
            email : this.email,
            username: this.username,
        },
        true
)}

UserSchema.methods.genRefreshToken = function () {
    return TokenCreate(
        {
            _id : this._id
        },
        false
)}

const User = mongoose.model('Users', UserSchema)

export {User}