"use client";
import { useSocket } from "./providers/socket-io-provider";
import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();
    

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