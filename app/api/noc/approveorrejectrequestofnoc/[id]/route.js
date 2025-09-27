import database from "@/Database/Database"
import { nocModel } from "@/models/Noc"
import { userModel } from "@/models/User"

import { NextResponse } from "next/server"

export async function PUT(req,{params}) {
    try {
        const {id} = await params
        const {textVerdict} = await req.json()
        await database()

        const findNocDoc = await nocModel.findByIdAndUpdate(id,{
            approvedornotbyteacher:textVerdict
        },{new:true})
        if(!findNocDoc){
            return NextResponse.json({
                message:'Something Wrong But Not Your Error',
                success:false
            })
        }
        return NextResponse.json({
            messgae:'Updated Successfully',
            success:true
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            message:'Server Error',
            status:500
        })
    }
}