import { cn } from '@/lib/utils';
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { LayoutList, User2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loder';

type callLayoutType='speaker-left'|'speaker-right'|'grid';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const[layout,setLayout]=useState<callLayoutType>('speaker-left');
  const CallLayout=()=>{
    switch(layout){
      case 'grid':
        return < PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout
        participantsBarPosition="left"/>
      case 'speaker-left':
        return <SpeakerLayout 
        participantsBarPosition="right"/>
        default:
          break;
    };
  };
  const[ShowPartcipant ,SetshowParticipant]=useState(false)
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;
  return (
    <section className=' relative h-screen w-full overflow-hidden pt-4 text-white'>
<div className='relative flex size-full items-center justify-center'>
<div className='flex size-full max-w-[1000px] items-center'>
<CallLayout/> 
</div>
<div className={cn(' h-[calc[100vh-86px)] hidden ml-2', {'show-block': ShowPartcipant })}>
  <CallParticipantsList onClose={()=>SetshowParticipant(false)} />
  </div>
</div>
<div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
  <CallControls/>
  <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as callLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => SetshowParticipant((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <User2 size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
</div>

    </section>
  )
}

export default MeetingRoom
