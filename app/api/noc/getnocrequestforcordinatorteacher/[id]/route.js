import { NextResponse } from "next/server";
import database from "@/Database/Database";
import { nocModel } from "@/models/Noc";
import { teacherModel } from "@/models/Teacher";
import { userModel } from "@/models/User";
import { internshipModel } from "@/models/Internship";

export async function GET(req, { params }) {
  try {
    const { id } = params; // teacher ID
    await database();

    // Find teacher first
    const teacher = await teacherModel.findById(id);
    if (!teacher || !teacher.assignedCordinatorOfNOC) {
      return NextResponse.json({
        message: 'No NOC assigned for this teacher',
        success: false
      });
    }

    // Fetch NOCs for the teacher's assigned department
    const nocs = await nocModel.find({
      department: teacher.assignedCordinatorOfNOC
    }).populate({
      path: 'student',
      select: '-password -appliednocrequest -internshipDetails' // exclude these fields from student
    })
      .populate({
        path: 'requestForInternship',
      });

    return NextResponse.json({
      message: 'NOCs fetched successfully',
      success: true,
      nocs
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: 'Server error',
      success: false
    });
  }
}
