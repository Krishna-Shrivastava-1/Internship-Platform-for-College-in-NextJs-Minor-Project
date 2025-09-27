

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel } from "@/models/User";
import database from "@/Database/Database";
import { teacherModel } from "@/models/Teacher";
const secretKey = process.env.Secretkey;
export async function POST(req, res) {
    try {
        const { email, password } = await req.json();
        await database();
        if (!email || !password) {
            return NextResponse.json({
                message: "Please Fill All Fields",
                error: 401,
                success: false,
            });
        }

        const user = await userModel.findOne({ email });
        const teacher = await teacherModel.findOne({ email })
        // if (!user) {
        //     return NextResponse.json({
        //         message: "User Not Found",
        //         success: false,
        //     });
        // }

        if (!teacher && !user) {
            return NextResponse.json({
                message: "User Not Found",
                success: false,
            });
        }
        // console.log(teacher?._id)
        const ispasswordcorrect = await bcrypt.compare(password, user?.password || teacher?.password);
        if (!ispasswordcorrect) {
            return NextResponse.json({
                message: "Invalid Credential",
                success: false,
            });
        }
        const role = email === "secretadmin@gmail.com" ? "superadmin" : user?.role || teacher?.role;
        const token = jwt.sign(
            {
                id: user?._id || teacher?._id,
                role
            },
            secretKey,
            { expiresIn: "1d" }
        );
        if (user) {

            await userModel.findByIdAndUpdate(user?._id, { role });
        } else if (teacher) {
            await teacherModel.findByIdAndUpdate(teacher?._id, { role });
        }
        const oneday = 24 * 60 * 60 * 1000;
        const expirationDate = new Date(Date.now() + oneday);
        cookies().set("authtoken", token, {
            httpOnly: true,
            sameSite: "strict",
            expires: expirationDate,
            secure: process.env.NODE_ENV === "production",
        });
        return NextResponse.json({
            token: token,
            message: `Logged in Successfully`,
            // message: `Logged in Successfully User - ${user.name}`,
            success: true,
            role

        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({
            message: "Server error",
            success: false,
        });
    }
}