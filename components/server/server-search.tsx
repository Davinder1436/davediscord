"use client"

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface serverSearchProps{
    data:{
        label:string;
        type:"channel"|"member";
        data:{
            icon:React.ReactNode;
            name:string;
            id:string;
        }[]|undefined

    }[]
}

export const ServerSearch = (
    {data}:serverSearchProps
)=>{
    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false)
    
    useEffect(()=>{
        const down = (e:KeyboardEvent)=>{
            if(e.key === "k" && (e.ctrlKey || e.metaKey)){
                e.preventDefault();
                setOpen((open)=>!open);
            }

        }
        document.addEventListener("keydown",down);
        return()=>document.removeEventListener("keydown",down);
    },[])

  
    const onClick = (id:string,type:"channel"|"member")=>{
        setOpen(false);
        if(type==="channel"){
            router.push(`/servers/${params.serverId}/channels/${id}`)
        }
        if(type==="member"){
            return router.push(`/servers/${params.serverId}/conversations/${id}`)
        }
    }

    return(
        <>
        <button onClick={()=>setOpen(true)} className=" group px-2 py-2 rounded-md flex item-center justify-around gap-x-2 w-full hover:bg-zinc-700/50 transition">
            <div className="inline-flex gap-2">
        <Search className="h-4 w-4 ml-1 mt-1 text-zinc-700/80" />
            <p className="font-semibold text-zinc-700">Search</p> </div>
            <kbd className="pointer-events-none inline-flex h-5 mt-1  select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-[8px">ctrl</span>K
            </kbd>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="search all members and channels"/>
                <CommandList>
                    <CommandEmpty>
                        No Search Results
                    </CommandEmpty>

                    {data.map(({label,type,data})=>{
                        if (!data?.length) return null;
                        return(
                            <CommandGroup key={label} heading={label}>
                                {
                                    data?.map(({icon,name,id})=>{
                                        return(
                                            <CommandItem key={id} onSelect={()=>onClick(id,type)}>
                                                {icon}
                                                <span>{name}</span>
                                            </CommandItem>
                                        )
                                    })
                  
                                }
                            </CommandGroup>
                    )
                    }
                        
                    )}

                </CommandList>
            
        </CommandDialog>
        
        </>
    
)
}