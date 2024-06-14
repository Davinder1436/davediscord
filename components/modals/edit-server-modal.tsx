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
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent } from "../ui/dialog";




const formSchema=z.object({
  name:z.string().min(1,{message:"image name is required"}),
  imageUrl:z.string().min(1,{message:"image url is required"})
})

export const EditServerModal=()=> {

  const {type,data,isOpen,onOpen, onClose } = useModal();  
  
const router = useRouter()

const isModalOpen = isOpen&& type === "EditServer";
  

const {server } = data;

  const form = useForm(
    {
      resolver:zodResolver(formSchema),
     defaultValues: {
        name:"",
        imageUrl:""
      }
    }
  )

  const isLoading= form.formState.isSubmitting;


  useEffect(()=>{
    if(server){form.setValue("name",server.name)
    form.setValue("imageUrl",server.imageURL)}
  },[server, form]);


  const onSubmitForm = async(values: z.infer<typeof formSchema>) => { 
    try{
      
      await axios.patch(`/api/servers/${server?.id}`,values)
      form.reset();
      router.refresh();
      onClose();
      router.push("/")
      
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
        Edit Server
        
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
           New Server Name</Label></FormLabel>
            <FormControl>
            <Input disabled={isLoading} id="servername"   placeholder="Dave's Server" type="text" {...field}/>
            </FormControl>
         
          
        </div>
        </FormItem>

       ) }/>

      <FormField 
      control={form.control}
      name="imageUrl"
      render ={ ({field})=>(
       <FormItem>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"
        >
          <FormControl>
        <FileUploadComponent
        endpoint="serverImage"
        value={field.value}
        onChange={field.onChange}/></FormControl>
          
        </div></FormItem>
       )}

      />
       
        
        
 
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
