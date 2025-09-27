import mongoose from "mongoose";
const bannerSchema = new mongoose.Schema({

    bannerimage:{
        type:String,
        required:true
    },

}, { timestamps: true })
export const bannerrModel = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);