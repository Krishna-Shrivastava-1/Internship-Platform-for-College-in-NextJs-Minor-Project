import database from "@/Database/Database"
import { bannerrModel } from "@/models/Banner";
import { NextResponse } from "next/server"



export async function GET(req, res) {
    try {
        await database();
        const getAllBannerImage = await bannerrModel.find()
        if (!getAllBannerImage) {
            return NextResponse.json({
                message: 'No Banner Image Found',
                status: 401
            })
        }
        return NextResponse.json({
            message: 'Banner Images Found',
            getAllBannerImage,
            status: 201
        })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message: 'Server error',
            status: 500
        })
    }
}
