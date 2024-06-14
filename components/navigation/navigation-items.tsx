"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter,useParams } from "next/navigation"
import { ActionTooltip } from "@/components/ActionTooltip"
 
interface NavigaitonItemsProps{

    id:string;
    imageUrl:string;
    name:string;

}

export const NavigationItems = ({id,imageUrl,name}:NavigaitonItemsProps) => {

    const params = useParams();
    const router = useRouter();

    const onClick = ()=>{
        router.push(`/servers/${id}`)
    }

    return (
        <div>
            <ActionTooltip
            side='right'
            align='center'
            label={name}><button className="group flex items-center relative"
            onClick={onClick}>
                <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[5px]", params?.serverId !== id && "group-hover:h-[20px]",
                params?.serverId === id ? "h-[36px]":"h-[8px]"

                )}/> 
                <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params.serverId === id && "bg-neutral-600 group-hover:bg-emarald-500 text-primary rounded-[16px]"
                )}>
                    <Image 
                    fill
                    src={imageUrl}
                    alt='channel'
                    />

                </div>

            </button>

            </ActionTooltip>
        </div>

    )
}