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







export const DeleteServerModal=()=> {

  const {type,data,isOpen,onOpen, onClose } = useModal();  
  
const router = useRouter()

const {server} = data;

const isModalOpen = isOpen&& type === "DeleteServer";
  


  

const [isLoading,setIsLoading] = useState(false)


const handleDelete = async ()=>{
    try{
        setIsLoading(true);
        await axios.delete(`/api/servers/${server?.id}`);
        router.refresh();
        onClose();
        router.push('/')
    }
    catch(error){
        console.log(error)
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
          Are you Sure you want to delete this server?
        </DialogTitle>
      </DialogHeader>
      <div className="p-2">
      <div className="flex items-center justify-end mt-2 gap-x-2"> 
       <Button onClick={onClose} className="px-4 py-3 text-lg font-semibold text-zinc-800 border-0 focus:border-0 bg-neutral-400 hover:bg-neutral-600  ">
        cancel
       </Button>
       <Button disabled={isLoading} onClick={handleDelete} className="px-4 py-3 text-lg font-semibold text-white  bg-red-500 hover:bg-red-600  ">
        Delete
       </Button>
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