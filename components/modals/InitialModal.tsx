"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { FileUploadComponent } from "../FileUploadComponent";
import axios from "axios"
import {set, useForm} from "react-hook-form"
import * as z from "zod"
import { zodResolver} from "@hookform/resolvers/zod"
import { Form,FormControl,FormField,FormItem, FormLabel } from "../ui/form";
import { redirect, useRouter } from "next/navigation";



const formSchema=z.object({
  name:z.string().min(1,{message:"image name is required"}),
  imageUrl:z.string().min(1,{message:"image url is required"})
})

export default function InitialModal() {
  const [isMounted,SetISMounted]=useState(false)
  useEffect(()=>{
  SetISMounted(true);
  },[])
  
const router = useRouter()
  
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

  const onSubmitForm = async(values: z.infer<typeof formSchema>) => { 
    try{
      await axios.post("/api/servers",values)
      form.reset();
      router.refresh();
      redirect("/")
      window.location.reload();
    }catch(error){
      console.log(error)
    }
  } 
if(!isMounted)return null



  return (
    <div className="max-w-md flex mt-[30vh] flex-col justify-center  w-full mx-auto h-[40vh] rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create a Server
      </h2>
      
      <Form {...form}>

      <form className="my-8" onSubmit={form.handleSubmit(onSubmitForm)} control={form} >
      
      <FormField control={form.control}
      name="name"
      render= {({field})=>(

        <FormItem>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          
         
            <FormLabel><Label>
           Server Name</Label></FormLabel>
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
          Create &rarr;
          <BottomGradient />
        </button>
        
      
      </form></Form>
    </div>
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

