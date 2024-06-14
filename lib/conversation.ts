import { db } from "./db"

export const getOrCreateConversation = async( memberOneId :string,memberTwoId:string)=>{
    try{
        let conversation = await findConversation(memberOneId,memberTwoId)||await findConversation(memberOneId,memberTwoId);

        if(!conversation){
            conversation = await CreateConversation(memberOneId,memberTwoId)
        }
        return conversation

    }
    catch(error){
        console.log(error)
    }
}

const findConversation = async( memberOneId :string,memberTwoId:string)=>{

    try{return await db.conversation.findFirst({
        where:{
            AND:[
                {memberOneId:memberOneId},
                {memberTwoId:memberTwoId}
        ]
        },
        include:{
            memberOne:{
                include:{
                    profile:true
                }
            },
            memberTwo:{
                include:{
                    profile:true
                }
            }
            
        }
    })}
    catch(error){
        console.log(error)
    }
}

const CreateConversation= async( memberOneId:string,memberTwoId:string)=>{

   try{ return  await db.conversation.create({
        data:{
            memberOneId,memberTwoId},
        include:{
            memberOne:{
                include:{
                    profile:true
                } 
            },
            memberTwo:{
                include:{
                    profile:true
                }
            }
        }
    })}
    catch(error){
        console.log(error)
    }

}