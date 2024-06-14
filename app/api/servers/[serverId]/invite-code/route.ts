import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { v4 as  uuidv4 } from "uuid";
export async function PATCH(
    req:Request
    ,{params}:{params:{serverId:string}}
){
    try{
        
        const profile = currentProfile();
        if(!profile){
            return new NextResponse("unauthorized",{status:401})
        }

        if(!params.serverId){
            return new NextResponse("Server Id missing",{status:400})
        }
        const server = await db.server.update({
            where:{
                id:params.serverId,
            },
            data:{
                inviteCode: uuidv4(),
            }
        })
        return NextResponse.json(server);

    }catch(error){
        console.log("server id error",error)
        return new NextResponse("Internal Error" ,{status:500})
    }
}