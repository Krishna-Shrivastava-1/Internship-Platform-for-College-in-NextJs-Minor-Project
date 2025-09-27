// import database from "@/Database/Database"
// import { NextResponse } from "next/server"
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });

// export async function POST(req,res) {
//     try {
//         await database();


//     } catch (error) {
//         console.log(error.message)
//         return NextResponse.json({
//             message:'Server error',
//             status:500
//         })
//     }
// }

import database from "@/Database/Database";
import { NextResponse } from "next/server";

import { uploadCloudinaryBanner } from "@/cloudinary/uploadbannerimage";
import { bannerrModel } from "@/models/Banner";


export async function POST(req) {
  try {
    await database();

    const formData = await req.formData();
    const file = formData.get("banner");

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ upload to Cloudinary
    const result = await uploadCloudinaryBanner(buffer);

    // ✅ save in MongoDB
    const banner = await bannerrModel.create({
      bannerimage: result.secure_url,
    });

    return NextResponse.json({ success: true, banner });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
