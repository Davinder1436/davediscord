"use client";
import React, { useState } from "react";
import axios from "axios";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";






export const InviteModal=()=> {

  const {type,data,isOpen,onOpen, onClose } = useModal();  
  
const router = useRouter()

const {server} = data;

const isModalOpen = isOpen&& type === "InviteToServer";
  
const origin = useOrigin();
const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  
const [copied,setCopied] = useState(false)
const [isLoading,setIsLoading] = useState(false)

const onCopy =()=>{
  navigator.clipboard.writeText(inviteUrl);
  setCopied(true)
  setTimeout(()=>{
    setCopied(false)
  },1000);
}

const newLink = async()=>{
  try{
setIsLoading(true)
    const response = await axios.patch(`api/servers/${server?.id}/invite-code`);
    onOpen("InviteToServer",response.data);

  }catch(error){
    console.log("link",error)
  }
  finally{
    setIsLoading(false)
  }
}


  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
     <DialogContent className="bg-white overflow-hidden text-black p-0">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Invite Friend
        </DialogTitle>
      </DialogHeader>
      <div className="p-6">
      <Label className="uppercase text-xs font-bold text-zinc-500">
    Server Invite Link
      </Label>
      <div className="flex items-center mt-2 gap-x-2">
        <Input disabled={isLoading}  className="bg-zinc-300/50  border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={inviteUrl}/>
           <Button onClick = {onCopy} disabled={isLoading} size="icon" >
          {copied?<Check className="h-4 w-4 bg-indigo-600"/>:<Copy className="h-4 w-4 bg-indigo-600"/>}
        
      </Button>
      </div><Button disabled={isLoading}
      className=" text-xs text-zinc-500 mt-4 "
      variant="link"
      size="sm"
      onClick={newLink}>
        Generate a new link <RefreshCcw className="h-4 w-4 ml-2"/>

      </Button>
     
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

