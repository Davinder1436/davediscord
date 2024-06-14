"use client"
import { Plus } from "lucide-react"
import { ActionTooltip } from "@/components/ActionTooltip"
import { useModal } from "@/hooks/use-modal-store"


export const NavigaitonAction = () => {

    const { onOpen } = useModal();


    return (
        <div>
            <div className="group flex items-center">
                <ActionTooltip side="right" align="center" label="Server">
            <button onClick={()=>onOpen("CreateServer")}
             className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded:[16px] transition-all justify-center bg-neutral-600 group-hover:bg-emarald-500 overflow-hidden items-center ">
            <Plus
            className=" group-hover:text-white transiton text-emarald-500"
            size={25}>

            </Plus>
            </button></ActionTooltip>
            </div>
        </div>
    )
}
