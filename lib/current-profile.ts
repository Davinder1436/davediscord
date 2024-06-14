import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile =()=>{

    const {userId}=auth();

    if(!userId){
    return null
}

const profile = db.profile.findUnique({
    where:{
        userId
    }
})
return profile
}