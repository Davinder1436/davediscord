
import { UserAvatar } from "../user-avatar";
import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../socket-indicator";


interface ChatHeaderProps{
    name:string;
    serverId:string;
    type:"channel"|"conversation";
    imageUrl?:string;
}
const ChatHeader = ({name,serverId,type,imageUrl}:ChatHeaderProps)=>{
    return (
        <>
        <div className="text-md font-semibold px-3 flex items-center h-12 border-b-2  border-zinc-50">
            <MobileToggle serverId={serverId}/>
            {
                type==="channel" &&(
                    <Hash className="h-5 w-5 ml-3 text-zinc-700"/>
                )
            }
            {
                type==="conversation" &&(
                    <UserAvatar src={imageUrl} className="h-9 w-9 mr-2 ml-3 text-zinc-700"/>
                )
            }
            <p className="text-zinc-800 font-semibold text-md capitalize  ">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                <SocketIndicator/>
            </div>
        </div> 
        
        </>
    )
}
export default ChatHeader