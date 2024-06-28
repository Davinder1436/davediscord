import { Channel, ChannelType, Server } from "@prisma/client";
import {create} from "zustand"

export type modalType= "CreateServer"|"InviteToServer"|"EditServer"|"ManageMembers"|"CreateChannel"|"DeleteServer"|"LeaveServer"|"DeleteChannel"|"EditChannel"|"MessageFIle"

interface ModalData{
    channel?:Channel;
    server?:Server;
    channelType?:ChannelType;
    apiUrl?:string;
    query?:Record<string,any>;
}

interface ModalStore{
    type: modalType | null;
    data:ModalData;
    isOpen : boolean;
    onOpen: (type:modalType,data?:ModalData)=>void;
    onClose: ()=>void;
    
}

export const useModal = create<ModalStore>((set)=>({
    type:null,
    data:{},
    isOpen:false,
    onOpen:(type,data={})=>set({isOpen:true,type,data}),
    onClose:()=>set({type:null,isOpen:false}),
    

}))
