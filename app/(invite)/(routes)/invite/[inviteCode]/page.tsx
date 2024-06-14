import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface inviteCodeProps{
    params:{
        inviteCode:string
    }

}

const inviteCodePage= async({params}:inviteCodeProps)=>{
    
    const profile =await currentProfile();

    if(!profile){
        redirect("/");
    }

    if(!params.inviteCode){
        redirect("/");
    }
    

    const existingServer = await db.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId: profile?.id,
                }
            }
        }
    })

    if(existingServer){
        redirect(`/servers/${existingServer.id}`)
    }
    const server = await db.server.update({
        where:{
            inviteCode:params.inviteCode,
        },
        data:{
            members:{
                create:[
                    {
                        profileId:profile?.id,

                    }
                ]
            }
        }

    })
    if(server){
        return redirect(`/servers/${server.id}`)
    }


    return (
        null
    )

    
}

export default  inviteCodePage