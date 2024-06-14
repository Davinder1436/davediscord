"use client";
import React, { useState } from "react";
import axios from "axios";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { ServersWithMembersWithProfiles } from "@/Types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";
import { Check, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion,Gavel, LoaderIcon, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubContent,DropdownMenuPortal, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";

import qs from "query-string"









export const MembersModal= ()=> {


  const {type,data,isOpen,onOpen, onClose } = useModal();  
  
const router = useRouter()

const {server} = data as {server:ServersWithMembersWithProfiles};

const isModalOpen = isOpen&& type === "ManageMembers";
   

const [isLoading,setIsLoading] = useState(false)

const roleIconMap = {
  "GUEST": null,
  "MODERATOR":<ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
  "ADMIN":<ShieldAlert className="h-4 w-4 ml-2 text-red-500"/>

}


const [loadingId,setLoadingId] = useState("")


const onKick = async(memberId:string)=>{
  try{
    setLoadingId(memberId);
    
    const url = qs.stringifyUrl({
      url:`/api/members/${memberId}`,
      query:{
        serverId:server.id,
       
      }
    })
    const response = await axios.delete(url)
    router.refresh()
    onOpen("ManageMembers",{server:response.data})
  }catch(error){
    console.log(error)
  }
  finally{
    setLoadingId("");
  }
}

const onRoleChange = async(memberId:string,role:MemberRole)=>{
  try{
    setLoadingId(memberId);
    
    const url = qs.stringifyUrl({
      url:`/api/members/${memberId}`,
      query:{
        serverId:server.id,
        
      }
    })
    const response = await axios.patch(url,{role})
    router.refresh()
    onOpen("ManageMembers",{server:response.data})

  }catch(error){
    console.log(error)
  }
  finally{
    setLoadingId("");
  }
}


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
     <DialogContent className="bg-white overflow-hidden text-black p-0">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Manage Members
        </DialogTitle>
        <DialogDescription>
          {server?.members?.length} {server?.members?.length === 1 ? "Member" : "Members"}
        </DialogDescription>
      </DialogHeader>
      <div className="p-6">
      <Label className="uppercase text-xs font-bold text-zinc-500">
    Server Members
      </Label>
      <ScrollArea className="max-h-[420px] mt-8 pr-6 ">

      </ScrollArea>
      <div className="flex flex-col  mt-2 gap-x-2">
        {
          server?.members.map((member)=>(<>
              <div className="flex  items-center  gap-x-2 mb-1">
                <UserAvatar src={member.profile.imageURL} />
                <p className="text-sm font-bold ">{member.profile.name}</p>
                <p className="text-xs "> {roleIconMap[member.role]}</p>
                
                {
              server.profileId!== member.profileId&& loadingId!==member.profileId &&
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="h-5 w-5 text-zinc-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center">
                        <ShieldQuestion className="w-4 h-4 mr-2"/>
                        <span>Role</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={()=>onRoleChange(member.id,"GUEST")} >
                            <Shield className="h-4 w-4 ml-1"/>
                            Guest {member.role ===MemberRole.GUEST && (<Check className="h-4 w-4 ml-1"/>)}
                          </DropdownMenuItem> 
                          <DropdownMenuItem onClick={()=>onRoleChange(member.id,"MODERATOR")}>
                            <Shield className="h-4 w-4 ml-1"/>
                            Moderator{member.role ===MemberRole.MODERATOR && (<Check className="h-4 w-4 ml-1"/>)}
                          </DropdownMenuItem> 
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator className="h-[1px] w-full bg-zinc-600"/>
                    <DropdownMenuItem onClick={()=>onKick(member.id)}>
                    <Gavel className="w-4 h-4 text-red-500"/>
                    Kick
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {loadingId===member.id&& <Loader2 className="h-4 w-4 ml-2 text-zinc-500 animate-spin"/>}
              </div>
             } 

              </div>
             <p className="text-xs text-neutral-600 mb-5">{member.profile.email}</p>
             
             
             </>
          ))

        }
          
      </div>
     
      </div>

     </DialogContent>
    </Dialog>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

