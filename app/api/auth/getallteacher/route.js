import database from "@/Database/Database"
import { teacherModel } from "@/models/Teacher"
import { userModel } from "@/models/User"
import { NextResponse } from "next/server"

export async function GET(req,res) {
    try {
        await database()

        const allTeacher = await teacherModel.find().select('-password')
        if(!allTeacher){
            return NextResponse.json({
                message:'No Teacher Found',
                status:401
            })
        }
        return NextResponse.json({
            message:'Teachers Found',
            status:201,
            allTeacher
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message:'Server error',
            status:500
        })
    }
}