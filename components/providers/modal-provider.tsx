"use client"

import { CreateServerModal} from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "../modals/invite-to-server-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/manage-members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { LeaveServerModal } from "../modals/leave-server-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";
export const ModalProvider=()=>{
    const [isMounted , SetISMounted]=useState(false)
    useEffect(()=>{
        SetISMounted(true)
    },[])



    if(!isMounted){
        return null
    }
    return (
        <>
        <CreateServerModal/>
        <InviteModal/>
        <EditServerModal/>
        <MembersModal/>
       <CreateChannelModal/>
       <DeleteServerModal/>
       <LeaveServerModal/>
       <DeleteChannelModal/>
       <EditChannelModal/>
        </>
    )
}
