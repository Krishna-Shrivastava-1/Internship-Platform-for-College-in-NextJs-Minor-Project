

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel } from "@/models/User";
import database from "@/Database/Database";
import { internshipModel } from "@/models/Internship";
import { teacherModel } from "@/models/Teacher";
import { nocModel } from "@/models/Noc";
const secretKey = process.env.Secretkey;
export async function GET(req, {params}) {
    try {
     const {id} = await params;
        await database();
       

        const user = await userModel.findById(id).select('-password').populate('internshipDetails appliednocrequest');
        const teacher = await teacherModel.findById(id).select('-password');
        if (!user && !teacher) {
            return NextResponse.json({
                message: "User Not Found",
                success: false,
            });
        }

        return NextResponse.json({
            user: user||teacher,
            message: `User found Successfully`,
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