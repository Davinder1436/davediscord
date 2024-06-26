"use client"

import { Tooltip ,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip"
import React from "react"

 
interface ActionTooltipProps{
label: string;
children: React.ReactNode;
side?:"top" | "bottom" | "left" | "right";
align?: "start" | "center" | "end";

}

export const ActionTooltip=({label,children,side,align}:ActionTooltipProps)=>{
    return(
        <TooltipProvider>
                <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                        {children}
                    </TooltipTrigger>
                    <TooltipContent side={side} align={align}>
                    <p className="font-semibold capitalize text-sm">{label.toLowerCase()} </p>
                    </TooltipContent>
                </Tooltip>
        </TooltipProvider>
    )
}