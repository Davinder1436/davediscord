"use client"

import { ServersWithMembersWithProfiles } from "@/Types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "../ActionTooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps{
    label:string;
    role?:MemberRole;
    SectionType:"channel"|"member";
    channelType?:ChannelType;
    server?:ServersWithMembersWithProfiles;

}



export const ServerSection = ({label,SectionType,role,channelType,server}:ServerSectionProps) => {
    
    const {onOpen } = useModal();

    return (
        <>
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500">{label}</p>
            {
                role!==MemberRole.GUEST && SectionType==="channel" && (
                    <ActionTooltip label="Create Channel" side="top">
                          <button onClick={()=>onOpen("CreateChannel",{channelType})} className=" text-zinc-600 transition hover:text-indigo-600">
                            <Plus className="h-4 w-4"/>
                          </button> 
                    </ActionTooltip>
                )
            }
            {
                role===MemberRole.ADMIN && SectionType==="member" && (
                    <ActionTooltip label="manage members" side="top">
                          <button onClick={()=>onOpen("ManageMembers",{server}) } className=" text-zinc-600 transition hover:text-indigo-600">
                            <Settings className="h-4 w-4"/>
                          </button> 
                    </ActionTooltip>
                )
            }
        </div>
        </>
    )
}