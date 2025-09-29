

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
// console.log('yeat',sessionHalf)
// Count total first
const total = await internshipModel.countDocuments(query);
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
const workTypes = ["Remote", "Onsite", "Hybrid"]
// As per year Total Internship Count
const totalInternshipAsPerYear = await Promise.all(
  years.map(async (year) => {
    const total = await internshipModel.countDocuments({ sessionYear: year })
    return { year, total }
  })
)

// console.log("yearCount", totalInternshipAsPerYear)


// As per year worktype internship count
const internshipStats = await Promise.all(
  years.map(async (year) => {
    const workTypeCounts = await Promise.all(
      workTypes.map(async (wt) => {
        const count = await internshipModel.countDocuments({ sessionYear: year, workType: wt })
        return { workType: wt, count }
      })
    )
    return { year, workTypeCounts }
  })
)

// console.log(JSON.stringify(internshipStats, null))
// Paginated fetch
const students = await internshipModel
  .find(query).sort({createdAt:-1})
  .skip((page - 1) * limit)
  .limit(limit);

return NextResponse.json({
  success: true,
  total,
  page,
  limit,
  students,
internshipStats,
totalInternshipAsPerYear
});

  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Server error", success: false },
      { status: 500 }
    );
  }
}
