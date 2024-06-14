import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"


export async function DELETE(req:Request,{params}: {params:{memberId:string}}){
    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url)
        const serverId= searchParams.get("serverId");
        
        if(!profile){
            return new NextResponse("unauthorized",{status:401})
        }
        if(!params.memberId){
            return new NextResponse("Member Id missing",{status:400})
        }
        if(!serverId){
            return new NextResponse("Server Id missing",{status:400})
        }
        const server= await db.server.update(
            {
                where:{
                    id:serverId,
                    profileId:profile.id
                },
                data:{
                    members:{
                        deleteMany:{
                            id:params.memberId,
                            profileId:{
                                not:profile.id
                            }
                        }
                    }
                },
                include:{
                    members:{
                        include:{
                            profile:true
                        },
                        orderBy:{
                            role:"asc"
                        }

                    }
                }
            }
        )
       return NextResponse.json(server)
        
        
    }
    catch(error){
        console.log("member id error",error)
        return new NextResponse("Internal Error" ,{status:500})
    }

}


export async function PATCH(
    req:Request,{params}: {params:{memberId:string}}){

        try{
            const profile = await currentProfile();
            const {role} = await req.json();
            const {searchParams} = new URL(req.url)
            const serverId = searchParams.get("serverId");

            if(!profile){
                return new NextResponse("unauthorized",{status:401})
            }
            
            if(!params.memberId){
                return new NextResponse("Member Id missing",{status:400})
            }
            if(!serverId){
                return new NextResponse("Server Id missing",{status:400})}
            
                const server = await db.server.update({
                    where:{
                        id:serverId,
                        profileId:profile.id
                    },
                    data:{
                        members:{
                            update:{
                                where:{
                                    id:params.memberId,
                                    profileId:{
                                        not:profile.id
                                    }
                                },
                                data:{
                                    role:role
                                }
                            }
                        }
                       
                    },
                    include:{
                        members:{
                            include:{
                                profile:true
                            },
                            orderBy:{
                                role:"asc"
                            }

                        }
                    }
                })
                return NextResponse.json(server)
            

        }
        catch(error){
            console.log("member id patch error",error)
            return new NextResponse("internal server error",{status:500})
        }
    }