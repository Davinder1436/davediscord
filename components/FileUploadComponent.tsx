"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Label } from "./ui/label";
import "@uploadthing/react/styles.css"
import { error } from "console";
import {X} from "lucide-react"
import Image from "next/image";
interface FileUploadProps {
    onChange : (url:string)=>void;
    value:string;
    endpoint : "messageFile" | "serverImage";

}



export const FileUploadComponent=({onChange,value,endpoint}:FileUploadProps)=>{
  const fileType = value?.split(".").pop();

  if(value&&fileType !== "pdf"){
      return(
        <div className="relative h-20 w-20">
          <Image fill src={value} alt="upload" className="rounded-full"/>
          <button className="p-1  bg-rose-500 rounded-full absolute top-0 right-0 shadow-md " onClick={()=>onChange("")}>
        <X className="h-4 w-4"></X>
        </button>
        </div>
      )
  }

  return (
    <div>
        <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res)=>{
            onChange(res?.[0].url)
        }}
        onUploadError={(error:Error)=>console.log(error)}>

        </UploadDropzone>
        
      
    </div>
  )
}


