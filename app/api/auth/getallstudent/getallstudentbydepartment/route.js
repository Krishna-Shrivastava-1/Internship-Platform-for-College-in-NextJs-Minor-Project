

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel } from "@/models/User";
import database from "@/Database/Database";
import { internshipModel } from "@/models/Internship";
const secretKey = process.env.Secretkey;
export async function GET(req) {
  try {
    await database();

    const { searchParams } = new URL(req.url)
    const dept = searchParams.get("dept");
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!dept) {
      return NextResponse.json(
        { message: "Department parameter is missing", success: false },
        { status: 400 }
      );
    }

    // Count total students first
    const total = await userModel.countDocuments({
      role: "student",
      department: dept,
      internshipDetails: { $exists: true, $not: { $size: 0 } },
    });

 
    const students = await userModel
      .find({
        role: "student",
        department: dept,
        internshipDetails: { $exists: true, $not: { $size: 0 } },
      })
      .select("-password")
      .populate("internshipDetails")
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: students,
      pagination: {
        total,          // total docs
        page,           // current page
        pages: Math.ceil(total / limit), // total pages
        limit           // per page
      },
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
