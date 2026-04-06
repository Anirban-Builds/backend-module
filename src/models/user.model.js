import mongoose, {Schema} from 'mongoose'
import bcrypt from "bcrypt"
import crypto from "node:crypto"
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
    refreshtoken : {type: String},
    resetPasswordToken: {type: String},
    resetPasswordExpiry: {type: Date},
    otp: {type: String},
    otpExpiry: {type: Date},
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

UserSchema.methods.genResetToken = async function () {
    const token = crypto.randomBytes(32).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    this.resetPasswordExpiry = Date.now() + 1000*60*10

    return token
}

UserSchema.methods.genOTP = async function() {
    const otp = crypto.randomInt(100000, 1000000).toString() // 6 digit OTP
    this.otp = await bcrypt.hash(otp, 10)
    this.otpExpiry = Date.now() + 5 * 60 * 1000

    return otp
}

UserSchema.methods.isOTPCorrect = async function (otp) {
     if (!this.otp) return false
    return await bcrypt.compare(otp, this.otp)
}

const User = mongoose.model('Users', UserSchema)

export {User}