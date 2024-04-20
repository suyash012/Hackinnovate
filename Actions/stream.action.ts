'use server';



import { currentUser } from "@clerk/nextjs";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apisecret=process.env.STREAM_SECRET_KEY;

export const tokenProviders = async () => {
    const user= await currentUser();

    if (!user) {
        throw new Error('User not found');
    }
    if (!apiKey) {
        throw new Error('Stream API key is required');
    }
    if (!apisecret) {
        throw new Error('Stream API secret is required');
    }

    const Client = new StreamChat(apiKey, apisecret);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
  
    const token = Client.createToken(user.id, expirationTime, issuedAt);
  
    return token;
}