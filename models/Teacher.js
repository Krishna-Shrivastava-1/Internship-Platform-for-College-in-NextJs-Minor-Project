import mongoose from "mongoose";
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,

    },
  
    role:{
        type:String,
        enum:['student','teacher','superadmin'],
         default: "student"
    },
  
    department:{
        type:String
    },
    assignedCordinatorOfNOC:{
        type:String,
       default:'Not Assigned'
    },
    allStudents:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    nocAppliedStudent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

}, { timestamps: true })
export const teacherModel = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);