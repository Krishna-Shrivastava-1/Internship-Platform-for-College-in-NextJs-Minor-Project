import database from "@/Database/Database";
import { internshipModel } from "@/models/Internship";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/User";
import { uploadCloudinary } from "@/cloudinary/upload";

export async function POST(req) {
  try {
    console.log("🌐 Connecting to database...");
    await database();
    console.log("✅ Database connected");

    const formData = await req.formData();
    console.log("📥 Received form data keys:", [...formData.keys()]);

    const file = formData.get("offerLetter");

 let uploadedResumeURL = "";
if (file) {
  console.log("📄 File detected:", file.name, file.type);
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploaded = await uploadCloudinary(buffer, `offer_${Date.now()}`);
    uploadedResumeURL = uploaded?.secure_url || "";
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    return NextResponse.json({ message: "Cloudinary upload failed", error: err?.message }, { status: 500 });
  }
}


    const token = (await cookies()).get("authtoken")?.value;
    if (!token) {
      console.error("❌ Missing auth token");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.Secretkey) {
      console.error("❌ Missing JWT Secretkey in env");
      return NextResponse.json({ message: "Server misconfigured" }, { status: 500 });
    }

    const decoded = jwt.verify(token, process.env.Secretkey);
    console.log("👤 Decoded JWT:", decoded);

    const userDept = await userModel.findById(decoded.id);
    if (!userDept) {
      console.error("❌ User not found in DB");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = {};
    formData.forEach((value, key) => {
      if (key !== "offerLetter") body[key] = value;
    });

    let internship = await internshipModel.create({
      ...body,
      student: decoded.id,
      department: userDept.department,
      offerletterurl: uploadedResumeURL,
    });

    await userModel.findByIdAndUpdate(
      decoded.id,
      { $addToSet: { internshipDetails: internship?._id } },
      { new: true }
    );

    console.log("✅ Internship created:", internship._id);

    return NextResponse.json({
      message: "Internship created successfully",
      success: true,
    });
  } catch (error) {
    console.error("❌ Internship POST error:", error);
    return NextResponse.json(
      {
        message: "Error creating internship",
        success: false,
        error: error?.message || JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
