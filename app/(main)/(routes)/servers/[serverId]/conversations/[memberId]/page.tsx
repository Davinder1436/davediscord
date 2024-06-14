import { currentProfile } from "@/lib/current-profile"
import { redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getOrCreateConversation } from "@/lib/conversation";
import ChatHeader from "@/components/chat/chat-header";
interface ConversationPageProps{
    params:{
        memberId:string,
        serverId:string
    }
}

const ConversationsPage = async({params}:ConversationPageProps) =>{

        const profile = await currentProfile();
        if(!profile){
            redirectToSignIn()
        }
        const currentMember = await db.member.findFirst({
            where:{
                profileId:profile?.id,
                serverId:params.serverId
            },
            include:{
                profile:true
            }
        })
        if(!currentMember){
            redirect("/")

        }
        const conversation = await getOrCreateConversation(currentMember.id,params.memberId);
        if(!conversation){
            redirect(`/servers/${params.serverId}`)
        }

        const {memberOne,memberTwo} = conversation;
        const otherMember = memberOne.profileId=== profile?.id? memberTwo:memberOne



    return(
        <div className="flex flex-col bg-neutral-200 h-full">
           <ChatHeader
            name={otherMember.profile.name}
            imageUrl={otherMember.profile.imageURL}
            serverId={params.serverId}
            type={"conversation"}
            />
        </div>
    )
}
export default ConversationsPage