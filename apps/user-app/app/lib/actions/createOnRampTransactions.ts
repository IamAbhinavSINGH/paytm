"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export const createOnRampTransactions = async (amount : number , provider : string) => {
    const session = await getServerSession(authOptions);
    const userId = session.user.id; 
    const token = Math.random().toString(); // shld be a token that comes from banking api's

    if(!userId){
        return "User not looged in !"
    }

    await prisma.onRampTransaction.create({
        data : {
            userId : Number(userId),
            amount : amount, 
            status : "Processing",
            startTime : new Date(),
            provider : provider,
            token : token 
        }
    })

    return "On ramp transcation added !"
}