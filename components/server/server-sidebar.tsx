
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType ,MemberRole} from "@prisma/client";

import { redirect } from "next/navigation";
import { ServerHeader } from "@/components/server/server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./serverChannel";
import { ServerMember } from "./server-members";
interface ServerSidebarProps{
serverId:string;
}
const iconMap = {
    [ChannelType.TEXT]:<Hash className="h-4 w-4 mr2"/>,
    [ChannelType.AUDIO]:<Mic className="h-4 w-4 mr2"/>,
    [ChannelType.VIDEO]:<Video className="h-4 w-4 mr2"/>,

}
const roleIconMap = {
    [MemberRole.ADMIN]:<ShieldAlert className="h-4 w-4 mr2 text-red-500"/>,
    [MemberRole.MODERATOR]:<ShieldCheck className="h-4 w-4 mr2 text-indigo-500"/>,
    [MemberRole.GUEST]:null
}


export const ServerSidebar= async({serverId}:ServerSidebarProps)=>{

    const profile = await currentProfile();
    if(!profile){
        redirect("/");
    }
    const server = await db.server.findUnique({
        where:{
            id: serverId},
        include:{
            channels:{
                orderBy:{
                    createdAt:"asc"
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:"asc"
                }
            }
        },
        
    });
    const textChannels = server?.channels.filter((channel)=>channel.type===ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel)=>channel.type===ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel)=>channel.type===ChannelType.VIDEO)
    const members = server?.members.filter((member)=>member.profileId!== profile.id)

    if(!server){
        redirect("/");
    }

    const role = server.members.find((member)=>member.profileId===profile.id)?.role;


    
return (
    <div className="flex flex-col w-full h-full text-primary bg-neutral-400">
        <ServerHeader
        server={server}
        role={role}>

        </ServerHeader>
        <ScrollArea className="flex-1 px-3 ">
            <div className="mt-2">
                <ServerSearch
                data={
                    [{
                        label:"Text Channels",
                        type:"channel",
                        data:textChannels?.map((channel)=>({
                            id:channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type],
                        }))

                    },{
                        label:"Voice Channels",
                        type:"channel",
                        data:audioChannels?.map((channel)=>({
                            id:channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type],
                        }))

                    },{
                        label:"Video Channels",
                        type:"channel",
                        data:videoChannels?.map((channel)=>({
                            id:channel.id,
                            name:channel.name,
                            icon:iconMap[channel.type],
                        }))

                    },
                    {
                        label:"Members",
                        type:"member",
                        data:members?.map((member)=>({
                            id:member.id,
                            name:member.profile.name,
                            icon:roleIconMap[member.role],
                        }))

                    }
                ]
                }
                />
            </div>

            <Separator className="bg-zinc-200  dark:bg-zinc-700 rounded-md my-2"/>
            {
                !!textChannels?.length&&(
                    <div className="mb-2">
                        <ServerSection
                        SectionType="channel"
                        channelType={ChannelType.TEXT}
                        role={role}
                        label="Text Channels"
                        /><div className="space-y-[2px]">
                        {
                            textChannels?.map((channel)=>{
                                return <ServerChannel
                                channel={channel}
                                server={server}
                                role={role}
                                />
                            })
                        }</div>
                    </div>
                )
            }
            {
                !!audioChannels?.length&&(
                    <div className="mb-2">
                        <ServerSection
                        SectionType="channel"
                        channelType={ChannelType.AUDIO}
                        role={role}
                        label="Voice Channels"
                        /><div className="space-y-[2px]">
                        {
                            audioChannels?.map((channel)=>{
                                return <ServerChannel
                                channel={channel}
                                server={server}
                                role={role}
                                />
                            })
                        }</div>
                    </div>
                )
            }
            {
                !!videoChannels?.length&&(
                    <div className="mb-2">
                        <ServerSection
                        SectionType="channel"
                        channelType={ChannelType.VIDEO}
                        role={role}
                        label="Video Channels"
                        /><div className="space-y-[2px]">
                        {
                            videoChannels?.map((channel)=>{
                                return <ServerChannel
                                channel={channel}
                                server={server}
                                role={role}
                                />
                            })
                        }</div>
                    </div>
                )
            }
            {
                !!members?.length&&(
                    <div className="mb-2">
                        <ServerSection
                        SectionType="member"
                        
                        role={role}
                        label="Members"
                        />
                        {
                            members?.map((member)=>{
                                return <ServerMember
                                key={member.id}
                                server={server}
                                member={member}/>
                            })
                        }
                    </div>
                )
            }
        </ScrollArea>
    </div>
)
}