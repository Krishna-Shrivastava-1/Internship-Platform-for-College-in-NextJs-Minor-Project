
import bcrypt from "bcryptjs";
import database from "@/Database/Database";
import { NextResponse } from "next/server";
import { userModel } from "@/models/User";
import { teacherModel } from "@/models/Teacher";




export async function POST(req, res) {
  try {
    const { name, email, password ,department } = await req.json();
    await database();
    if (!name || !email || !password) {
      return NextResponse.json({
        message: "Please Fill All Fields",
        error: 401,
        success: false,
      });
    }

    const isUserExist = await userModel.findOne({ email }) || await teacherModel.findOne({email});
    if (isUserExist) {
      return NextResponse.json({
        message: "User Already Exist",
        success: false,
      });
    }
   
    const hashpassword = await bcrypt.hash(password, 12);
    await userModel.create({
      name,
      email,
      password: hashpassword,
     department
    });



    return NextResponse.json({
      message: "Account Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Server Error",
      success: false,
    });
  }
}