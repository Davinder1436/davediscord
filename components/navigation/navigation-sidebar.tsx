import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { syncBuiltinESMExports } from "module";
import {redirect} from "next/navigation"
import { NavigaitonAction } from "./navigation-action";

import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItems } from "@/components/navigation/navigation-items";
import { UserButton } from "@clerk/nextjs";

export const NavigationSideBar = async()=>{

    const profile = await currentProfile()

    if(!profile){
        redirect("/")
    }

    const servers = await db.server.findMany(
        {
            where:{
                members:{
                    some:{
                        profileId:profile.id
                    }
                }
            }
        }
    )

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full py-3">
            <NavigaitonAction/>
            <Separator className="w-10 h-[2px] mx-auto bg-zinc-500  "/>
            <ScrollArea className="flex- w-full p-[2px]">
                {
                    servers.map((server)=>(
                        <div key={server.id}>
                            <NavigationItems

                            id={server.id}
                            imageUrl={server.imageURL}
                            name={server.name}
                            >

                            </NavigationItems>
                        </div>
                    )

                    )
                }

            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <UserButton
                afterSignOutUrl="/"
                appearance={
                    {
                        elements:{
                            avatarBox:"h-[48px] w-[48px]"
                        }
                    }
                }/>
            </div>
        </div>
    )

}
