
"use client";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { FileUploadComponent } from "../FileUploadComponent";
import axios from "axios"
import {set, useForm} from "react-hook-form"
import * as z from "zod"
import { zodResolver} from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormItem, FormLabel } from "../ui/form";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent } from "../ui/dialog";
import { ChannelType } from "@prisma/client";
import qs from "query-string"

import { Select,SelectContent,SelectTrigger,SelectItem,SelectValue } from "../ui/select";

const formSchema=z.object({
  name:z.string().min(1,{message:"image name is required"}).refine(name=>name!=="general",{message:"channel name cannot be general"}),
    type:z.nativeEnum(ChannelType)
})

export const EditChannelModal=()=> {

  const {type,data,isOpen,onOpen, onClose } = useModal();  
  
const router = useRouter()
const params = useParams();



const isModalOpen = isOpen&& type === "EditChannel";
  
const {channelType,channel} = data;

  const form = useForm( 
    {
      resolver:zodResolver(formSchema),
     defaultValues: {
        name:"",
        type: channel?.type || ChannelType.TEXT
      }
    }
  )
  

  useEffect(()=>{ 
    if(channel){
      form.setValue("name",channel?.name);
      form.setValue("type",channel?.type);
    }
    
  },[channel,form])

  const isLoading= form.formState.isSubmitting;

  const onSubmitForm = async(values: z.infer<typeof formSchema>) => { 

    try{
      
        const url =qs.stringifyUrl(
            {
              url:`/api/channels/${channel?.id}`,
              query:{
                serverId:params?.serverId
              }
            })
      await axios.patch(url,values);
      
      onClose();
      form.reset();
     router.refresh();
     router.push("/");
      
      
      
    }catch(error){
      console.log(error)
    }
  } 


const handleClose=()=>{

  
  form.reset();
  router.refresh();
  onClose();
}


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
     
     <DialogContent>

    <div className="max-w-md flex mt-[5vh] flex-col justify-center  w-full mx-auto h-[60vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Edit Channel
        
      </h2>
      
      <Form {...form}>

      <form className="my-8" onSubmit={form.handleSubmit(onSubmitForm)} control={form} >
      
      <FormField control={form.control}
      name="name"
      render= {({field})=>(

        
        <FormItem>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"
                >
          
         
            <FormLabel><Label>
           Channel Name</Label></FormLabel>
            <FormControl>
            <Input disabled={isLoading} id="servername"   placeholder="Dave's Server" type="text" {...field}/>
            </FormControl>
         
          
        </div>
        </FormItem>

       ) }/>

       <FormField control={form.control}
       name="type"
       render={({field})=>(

        <FormItem>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"
            >

      <FormLabel><Label>
      Channel Type</Label></FormLabel>
      <Select
      disabled={isLoading}
      onValueChange={field.onChange}
      value={field.value}>
        <FormControl>
            <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black  ring-offset-0 capitalize outline-none">
            <SelectValue placeholder="Select Channel Type"/>
            </SelectTrigger>
        </FormControl>
            <SelectContent>'{Object.values(ChannelType).map((type)=>(<SelectItem key={type} value={type} className="capitalize">{type.toLowerCase()}</SelectItem>))}</SelectContent>

      </Select>

                
                 </div></FormItem>
       )}/>

     
        
        
 
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Save &rarr;
          <BottomGradient />
        </button>
        
      
      </form></Form>
    </div>
    </DialogContent></Dialog>
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

