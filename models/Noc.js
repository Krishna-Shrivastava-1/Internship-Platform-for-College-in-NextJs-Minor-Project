import mongoose from "mongoose";
const nocSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    requestForInternship: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       ref:'Internship',
       unique:true
    },
    approvedornotbyteacher: {
        type: String,
        enum:['Approved','Rejected','Pending'],
        default:'Pending'
    },
   
    department:{
        type:String
    },

}, { timestamps: true })
export const nocModel = mongoose.models.Noc || mongoose.model("Noc", nocSchema);