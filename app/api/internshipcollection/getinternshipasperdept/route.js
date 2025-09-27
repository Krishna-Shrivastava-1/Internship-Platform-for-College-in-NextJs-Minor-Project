

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

  const { searchParams } = new URL(req.url);

const dept = searchParams.get("dept");
const year = parseInt(searchParams.get("year") || '');
const semester = parseInt(searchParams.get("semester") || '');
const page = parseInt(searchParams.get("page") || "1");
const limit = parseInt(searchParams.get("limit") || "10");
const sessionYear = parseInt(searchParams.get("sessionyear") || "");
const sessionHalf = searchParams.get("sessionhalf") || "";


if (!dept) {
  return NextResponse.json(
    { message: "Department parameter is missing", success: false },
    { status: 400 }
  );
}

// Build query dynamically
let query = { department: dept };

if (!isNaN(year)) {
  query.year = year;
}
if (!isNaN(semester)) {
  query.semester = semester;
}
if (!isNaN(sessionYear)) {
  query.sessionYear = sessionYear;
}
if (sessionHalf) {
  query.sessionHalf = sessionHalf;
}
console.log('yeat',sessionHalf)
// Count total first
const total = await internshipModel.countDocuments(query);

// Paginated fetch
const students = await internshipModel
  .find(query)
  .skip((page - 1) * limit)
  .limit(limit);

return NextResponse.json({
  success: true,
  total,
  page,
  limit,
  students,
});

  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
