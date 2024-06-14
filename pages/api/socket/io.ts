import {Server as NetServer} from "net"
import { NextApiRequest, NextApiResponse } from "next"
import {Server as ServerIO} from "socket.io"

import {NextApiResponseServerIo} from "@/Types";

export const config = {
    api:{
        bodyParser:false
    },

}

const ioHandler = ( req:NextApiRequest , res:NextApiResponseServerIo) => {
    
    if(!res.socket.server.io){
       
        const path = "api/socket/io";
        const httpServer:NetServer = res.socket.server as any;
        //@ts-ignore
        const io = new ServerIO( httpServer,{
            path:path,
            addTrailingSlash:false
        });
        res.socket.server.io =io;
    }
    res.end()
   
}

export default ioHandler;