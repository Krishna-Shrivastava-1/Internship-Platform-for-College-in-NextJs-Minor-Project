import { NextResponse } from "next/server";
import database from "@/Database/Database";
import { nocModel } from "@/models/Noc";
import { teacherModel } from "@/models/Teacher";
import { userModel } from "@/models/User";
import { internshipModel } from "@/models/Internship";

export async function GET(req, { params }) {
  try {
    const { id } =await params; // teacher ID
    await database();
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || 1)
    const limit = parseInt(searchParams.get('limit') || 10)
    // Find teacher first
    const teacher = await teacherModel.findById(id);
    if (!teacher || !teacher.assignedCordinatorOfNOC) {
      return NextResponse.json({
        message: 'No NOC assigned for this teacher',
        success: false
      });
    }
 const total = await nocModel.countDocuments({
    
      department: teacher.assignedCordinatorOfNOC,
     
    });
    // Fetch NOCs for the teacher's assigned department
    const nocs = await nocModel.find({
      department: teacher.assignedCordinatorOfNOC
    }).populate({
      path: 'student',
      select: '-password -appliednocrequest -internshipDetails' // exclude these fields from student
    })
      .populate({
        path: 'requestForInternship',
      }).sort({createdAt:-1}).skip((page - 1) * limit).limit(limit);

    return NextResponse.json({
      message: 'NOCs fetched successfully',
      success: true,
      nocs,
      totalPages:Math.ceil(total / limit)
    });

  } catch (err) {
    console.error(err.message);
    return NextResponse.json({
      message: 'Server error',
      success: false
    });
  }
}
