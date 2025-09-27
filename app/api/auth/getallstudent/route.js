

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel } from "@/models/User";
import database from "@/Database/Database";
import { internshipModel } from "@/models/Internship";
const secretKey = process.env.Secretkey;
export async function GET(req, res) {
  try {

    await database();


    const students = await userModel
      .find({
        role: "student",
        internshipDetails: { $exists: true, $not: { $size: 0 } }
      })
      .select("-password")

    if (!students || students.length === 0) {
      return NextResponse.json({
        message: "No Students Found with internships",
        success: false,
      });
    }

    return NextResponse.json({
      user: students,
      message: `Users found Successfully`,
      // message: `Logged in Successfully User - ${user.name}`,
      success: true,

    });


  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Server error",
      success: false,
    });
  }
}