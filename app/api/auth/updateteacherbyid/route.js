
import database from "@/Database/Database"
import { teacherModel } from "@/models/Teacher"

import { NextResponse } from "next/server"

export async function PUT(req, res) {
    try {
    const {teacherId, assignedCordinatorOfNOC,name,department} = await req.json()
    // console.log(teacherId)
    await database()
let checkteacherDept = [];

if (assignedCordinatorOfNOC) {
  checkteacherDept = await teacherModel.find({
    assignedCordinatorOfNOC
  });

  if (checkteacherDept.length > 0 && !checkteacherDept.some(t => t._id.toString() === teacherId)) {
    return NextResponse.json({
      message: "Coordinator department already assigned to another teacher",
      success: false,
      status: 409
    });
  }
}

    const teacher = await teacherModel.findByIdAndUpdate(teacherId,{
       assignedCordinatorOfNOC,
       name,
       department
    },{new:true})
  if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found", success: false },
        { status: 404 }
      )
    }
        return NextResponse.json({
            message: 'Updated Successfully',
            success: true,
            status: 201,
            teacher
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            messaage: "Server Error",
            status: 500
        })
    }
}