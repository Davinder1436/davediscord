"use client"

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../ActionTooltip";
import { modalType, useModal } from "@/hooks/use-modal-store";
import React from "react";
interface ServerChannelProps{
    channel:Channel;
    server:Server;
    role?:MemberRole;

}
const iconMap = {
    [ChannelType.TEXT]:Hash,
    [ChannelType.AUDIO]:Mic,
    [ChannelType.VIDEO]:Video,
}


export const ServerChannel = ({channel,server,role}:ServerChannelProps)=>{

    const params = useParams();
    const router = useRouter();
    const {onOpen} = useModal();
        const Icon = iconMap[channel.type];

    const onClick = ()=>{

        router.push(`/servers/${server.id}/channels/${channel.id}`)
    }
    const onAction = (e:React.MouseEvent,action:modalType)=>{

        e.stopPropagation();
        onOpen(action,{server,channel})
    }
    return(
        <>
        <button
        onClick={onClick}
        className={cn("group flex px-2 py-2 rounded-md items-center gap-x-2 w-full hover:bg-zinc-300/50 transition mb-1",params?.channelId===channel.id && "bg-zinc-300/50")}
        >
            <Icon className=" flex-shrink-0 w-5 h-5 text-zinc-600" />
            <p className={cn("line-clamp-1 font-semibold text-zinc-700 text-sm transition",params?.channelId===channel.id && "text-indigo-600")}>
                {channel.name}
            </p>
            {
                channel.name!=="general" && role!== MemberRole.GUEST && (
                    <div className="ml-alto flex gap-x-2 items-center">
                        <ActionTooltip label="Edit">
                            <Edit onClick={(e)=>{onAction(e,"EditChannel")}} className=" hidden group-hover:block text-zinc-100 h-4 w-4 transition"/> 
                        </ActionTooltip>
                        <ActionTooltip label="Remove">
                            <Trash onClick={(e)=>{onAction(e,"DeleteChannel")}} className=" hidden group-hover:block text-zinc-100 h-4 w-4 transition"/> 
                        </ActionTooltip>
                        

                    </div>
                )}{
                channel.name==="general"&&(
                    <div className="ml-alto flex gap-x-2 items-center">
                        <Lock className="  text-zinc-100 h-4 w-4 transition"/>
                    </div>
                )

            }

        </button>
        </>
    )
}