const mongoose = require('mongoose')

const signinSchema = {
    _id: mongoose.Schema.Types.ObjectId,
    fn:{type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    photo: {type:Buffer, required: true},
    dob: {type:String, required: true},
    place: {type:String, required: true}
}

module.exports = mongoose.model("SigninRegistory", signinSchema)