import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,

    },
    internshipDetails:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Internship'
    }],
    role:{
        type:String,
        enum:['student','teacher','superadmin'],
         default: "student"
    },
    isFilled:{
        type:Boolean,
        default:false
    },
    department:{
        type:String
    },
    appliednocrequest:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Noc'
    }]

}, { timestamps: true })
export const userModel = mongoose.models.User || mongoose.model("User", userSchema);