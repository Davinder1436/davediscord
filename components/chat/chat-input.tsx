"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form,FormControl,FormField,FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import axios from "axios";
import qs from "query-string"

interface ChatInputProps{
    name:string;
    type:"conversation"|"channel"
    apiUrl :string;
    query:Record<string,any>;

}
const formSchema = z.object({
    content:z.string().min(1),

});


export const ChatInput= ({apiUrl,name,query,type}:ChatInputProps)=>{


const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        content:"",
    }
})

const isLoading = form.formState.isSubmitting;

const onSubmit = async(values:z.infer<typeof formSchema>)=>{
   try{

    const url = qs.stringifyUrl({
        url: apiUrl,
        query
    })
    const res = await axios.post(url,values);
    console.log(res)

   }catch(error){
    console.log(error)
   }
}

    return (
        <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                    <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button type="button" className="absolute left-7 top-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 transition rounded-full flex p-1 items-center justify-center">
                                        <Plus className="h-4 w-4 text-white"/>
                                    </button>
                                    <Input disabled={isLoading}  className="px-14 py-6 bg-zinc-400/90 border-none border-0 focus-visible:ring-0 focus-visible-ring-offset-0 text-zinc-600"
                                    placeholder={`message ${type==="conversation"?name:"#"+name}`}
                                    {...field}
                                    />
                                </div>
                                    </FormControl>
                            </FormItem>
                        )}/>
                        
                    </form>
                </Form>
        </div>
    )
}