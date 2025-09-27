import database from "@/Database/Database"
import { internshipModel } from "@/models/Internship"
import { nocModel } from "@/models/Noc"
import { userModel } from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(req, res) {
    try {
        const { studentId, internshipId, studentDept } = await req.json()
        await database()
        const student = await userModel.findOne({
            _id: studentId,
            'internshipDetails': internshipId
        });
        const internshipfind = await internshipModel.findById(internshipId)
        if (!student || !internshipfind) {
            return NextResponse.json({
                message: 'Student or Internship not Found',
                status: 401,
                success: false
            })
        }
        const findrequestinDB = await nocModel.findOne({
            student: studentId,
            requestForInternship: internshipId
        });

        if (findrequestinDB) {
            return NextResponse.json({
                message: 'Request Already Generated',
                findrequestinDB,
                success: false
            });
        }
        const newRequest = await nocModel.create({
            department: studentDept,
            student: studentId,
            requestForInternship: internshipId
        })

        if (!newRequest) {
            return NextResponse.json({
                message: 'Noc Request Creation is invalid',
                success: false
            })
        }
        const updateStudent = await userModel.findByIdAndUpdate(studentId, {
            $addToSet: { appliednocrequest: newRequest?._id }
        }, { new: true })
        return NextResponse.json({
            message: 'Request Created Successfully',
            status: 201,
            success: true,
            newRequest
        })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            messgae: 'Server error',
            status: 500,
            success: false
        })
    }
}