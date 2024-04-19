"use client";
import { tokenProvider } from '@/Actions/Stream.actions';
import Loader from '@/components/Loder';
import { useUser } from '@clerk/nextjs/app-beta/client';


import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
    name,
    useStreamVideoClient,
  } from '@stream-io/video-react-sdk';
import { ReactNode, use, useEffect, useState } from 'react';
  
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  
  
  
   const StreamVedioProvider  = ({children}:{children:ReactNode}) => {
    const [videoClient, SetVideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error('Stream API key is required');
        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
             // Fix: Changed 'tokenprovider' to 'tokenProvider'
            tokenProvider: tokenProvider,
           
        });
        SetVideoClient(client);
    }, [user, isLoaded]);
    if (!videoClient) return <Loader />;
    return (
      <StreamVideo client={videoClient}>
        {children}
      </StreamVideo>
    );
  };

  export default StreamVedioProvider;