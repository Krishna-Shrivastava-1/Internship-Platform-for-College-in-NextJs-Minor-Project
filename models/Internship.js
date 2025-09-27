import mongoose from "mongoose";
const internshipSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true
    },
    year: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    },
    stipend: {
        type: Number,
        default:0
    },
    duration: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    workType: {
        type: String,
        enum: ["Remote", "Onsite", "Hybrid"]
    },
    jobDescription: {
        type: String
    },
    role: {
        type: String
    },
    approvedornot: {
        type: String
    },
    department: {
        type: String
    },
    sessionHalf: {
        type: String,
        enum: ["Jan-Jun", "Jul-Dec"],
        required: true,
    },
    sessionYear: {
        type: Number, // e.g., 2023
        required: true,
    },
    offerletterurl: {
        type: String,
        required: true
    }



}, { timestamps: true })
export const internshipModel = mongoose.models.Internship || mongoose.model("Internship", internshipSchema);