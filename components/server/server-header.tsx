"use client"

import { ServersWithMembersWithProfiles } from "@/Types";
import { MemberRole, Server } from "@prisma/client"
import { DropdownMenu, DropdownMenuItem,DropdownMenuContent,DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, Delete, LogOut, PlusCircle, Settings, Trash, User2, UserPlus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";


interface ServerHeaderProps{
    server: ServersWithMembersWithProfiles;
    role?:MemberRole;
};

export const ServerHeader=({server,role}:ServerHeaderProps)=>{

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin||role === MemberRole.MODERATOR;

    const {onOpen }= useModal();

    return(<div className="" ><DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
         <button className="w-[90%] text-md font-semibold mx-3 flex items-center
         h-12 border-slate-100 border-b-2 transition">
            {server.name}
            <ChevronDown className="h-5 w-5  ml-auto"/>
            </button>   

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 t-sm font-medium text-black ">
            {isModerator && (
                <DropdownMenuItem className="text-indigo-500 px-3 py-2 text-sm cursor-pointer"
                onClick={() => onOpen("InviteToServer",{server})}>
                    Invite People<UserPlus className="h-4 w-4 mx-2"/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer"
                onClick={() => onOpen("EditServer",{server})}>
                   Server Settings <Settings className="h-4 w-4 mx-2"/>
                </DropdownMenuItem>
            )}
            {isAdmin && (
                <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer"
                onClick={() => onOpen("ManageMembers",{server})}>
                   Manage Members <User2 className="h-4 w-4 mx-2"/>
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuItem className=" px-3 py-2 text-sm cursor-pointer"
                onClick={() => onOpen("CreateChannel",{server})}>
                   Create Channel  <PlusCircle className="h-4 w-4 mx-2" />
                </DropdownMenuItem>
            )}
            {isModerator && (
                <DropdownMenuSeparator/>
            )}
            {isAdmin && (
                <DropdownMenuItem className=" text-red-700 px-3 py-2 text-sm cursor-pointer"
                onClick={()=>{onOpen("DeleteServer"),{server}}}>
                Delete Server <Trash className="h-4 w-4 mx-2"/>
             </DropdownMenuItem>
            )}
            {!isAdmin && (
                <DropdownMenuItem className=" text-red-700 px-3 py-2 text-sm cursor-pointer"
                onClick={()=>{onOpen("LeaveServer"),{server}}}>
                Leave Server <LogOut className="h-4 w-4 mx-2"/>
             </DropdownMenuItem>
            )}


        </DropdownMenuContent>
        
        </DropdownMenu></div>)
}