
import database from "@/Database/Database";
import { internshipModel } from "@/models/Internship";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/User";
import { uploadCloudinary } from "@/cloudinary/upload";


export async function POST(req) {
  try {
    await database();

    const formData = await req.formData();

    const file = formData.get("offerLetter");

    let uploadedResumeURL = "";
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const getUploadedResumeUrl = await uploadCloudinary(buffer);
      uploadedResumeURL = getUploadedResumeUrl?.secure_url;
    }

    const token = (await cookies()).get("authtoken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.Secretkey);
    const userDept = await userModel.findById(decoded.id);

    // Build internship data from formData fields
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

    return NextResponse.json({
      message: "Internship created successfully",
      success: true,
      internship,
    });
  } catch (error) {
    console.error("Internship POST error:", error);
    return NextResponse.json(
    { message: "Error creating internship", success: false, error: error?.message },
    { status: 500 }
  );
  }
}
