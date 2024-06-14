import { Avatar,AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
interface userAvatarProps{
    src?:string;
    className?:string;
}

export const UserAvatar = ({src,className}:userAvatarProps)=>{
    
    return (
        <Avatar className={cn("h-7 w-7 md:h-7 md:w-7 ",className)}>
            <AvatarImage src={src}/>
        </Avatar>
    )
}