"use client"

import { useRouter, useSearchParams } from "next/navigation";

import { Member, Server,Profile, MemberRole } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";


import { cn } from "@/lib/utils";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps{
    server:Server;
    member:Member&{profile:Profile};
}

const roleIconMap = {
    [MemberRole.GUEST]:null,
    [MemberRole.MODERATOR]:<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    [MemberRole.ADMIN]:<ShieldAlert className="h-4 w-4 ml-2 text-red-500"/>,
}

export const ServerMember = ({member,server}:ServerMemberProps)=>{

       const params = useSearchParams();
        const router = useRouter()

        const icon = roleIconMap[member.role]

        const onClick = ()=>{
            router.push(`/servers/${server.id}/conversations/${member.id}`)
        }
    return(
        <>
        <div>
            <button onClick={onClick}
             className={cn("group px-2 py-2 flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition",params?.memberId===member.id && "bg-zinc-700/50")}>
                <UserAvatar src = {member.profile?.imageURL} className="h-8 w-8 md:h-8 md:w-8"/>
                <p className={cn("font-semibold text-zinc-700 text-sm transition",params?.memberId===member.id && "text-indigo-600")}>
                 {member.profile?.name}   </p>
            {icon}
            </button>
        </div>
        </>
    )
}