
import database from "@/Database/Database"
import { internshipModel } from "@/models/Internship"

    // const {internshipId, duration,companyName,location,jobDescription,role,semester,stipend,workType,year} = await req.json()
import { NextResponse } from "next/server"

export async function PUT(req, res) {
    try {

     const body = await req.json();
    const { _id, ...updateFields } = body; // extract _id from request body

    await database();

    const updatedInternship = await internshipModel.findByIdAndUpdate(
      _id,
      updateFields, // pass actual fields, not wrapped in "body"
      { new: true }
    );

    if (!updatedInternship) {
      return NextResponse.json(
        { message: "Internship not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Updated Successfully",
      success: true,
      internship: updatedInternship,
    });
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            messaage: "Server Error",
            status: 500
        })
    }
}