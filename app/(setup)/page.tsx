import { InitialProfile } from "@/lib/initial-profile"
import { db } from "@/lib/db"
import {redirect} from "next/navigation"
import InitialModal from "@/components/modals/InitialModal";




const Setup = async()=>{
    
    const profile = await InitialProfile()
    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })
    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return (
        <div>
<InitialModal/>
        </div>
    )
}
export default Setup