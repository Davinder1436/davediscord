import { Member, Profile, Server } from "@prisma/client";



export type ServersWithMembersWithProfiles = Server&{
    members: (Member&{
        profile:Profile,
    })[]
}
export enum PusherEvent {
    MESSAGE = "message",
}

export type MessageWithMemberWithProfile = Message & {
    member: Member & { profile: Profile };
};
