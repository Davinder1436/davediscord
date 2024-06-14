import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { v4 as  uuidv4 } from "uuid";
export async function PATCH(
    req:Request
    ,{params}:{params:{serverId:string}}
){
    try{

        const {name ,imageUrl} = await req.json();
        
        const profile = await currentProfile();
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
                name:name,
                imageURL:imageUrl,
            }
        })
        return NextResponse.json(server);

    }catch(error){
        console.log("server id patch",error)
        return new NextResponse("Internal Error" ,{status:500})
    }
}

export async function DELETE(
    req:Request,{params}:{params:{serverId:string}}
){
    try{
        const profile = await currentProfile();
        if(!profile){
            return new NextResponse("unauthorized",{status:401})
        }
        if(!params.serverId){
            return new NextResponse("Server Id missing",{status:400})
        }

        return await db.server.delete({
            where:{
                id:params.serverId,
                profileId:profile.id
            }
        })

    }
    catch(error){
        console.log("server delete error",error)
        return new NextResponse("Internal Error" ,{status:500})
    }
}
