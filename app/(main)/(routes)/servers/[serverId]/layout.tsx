import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";
 const ServerPage = async({ children, params }: { children: React.ReactNode,params: { serverId: string } }) => {
    
    const profile = await currentProfile();

    if(!profile){
        redirectToSignIn()
    }
    const server = db.server.findUnique({
        where:{
            id: params.serverId,
            members:{
                some:{
                    profileId: profile?.id
                }
            }
        }
    })
    if(!server){
        redirect("/");
    }



    return (
        <div className="bg-neutral-300 flex w-[100vw] h-full ">
            <div className="hidden md:flex h-full w-[20vw] z-20 y-inset-0 flex-col">
            <ServerSidebar serverId={params.serverId}/>
            </div><main className="bg-neutral-300 w-[80vw] ">
            {children}</main></div>
    )
}

export default   ServerPage;