"use client";
import { usePusherClient } from "./providers/pusher-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = usePusherClient()
    

        if(!isConnected){
            return(
                    <Badge variant={"outline"}  className="bg-yellow-600 text-white border-none">
                       Fallback:polling every 1s
                    </Badge>
            )
        }
        else{
            return(
                    <Badge variant={"outline"}  className="bg-emerald-600 text-white border-none">
                       Live RealTime Updates
                    </Badge>
            )
        }
    
}