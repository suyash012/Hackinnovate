" use client"
import { Call, DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({SetIsSetup}:{
    SetIsSetup:(value:boolean)=>void
}) => {
    const [isMicCamToggled, setIsMicCamToggled] = useState(false);
    const call=useCall();
    if(!call){
        throw new Error('Call not found');
    }
useEffect(() => {
        if (isMicCamToggled) {
          call?.camera.disable();
          call?.microphone.disable();
        } else {
          call?.camera.enable();
          call?.microphone.enable();
        }
      }, [isMicCamToggled, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
    <h1 className="text-center text-2xl font-bold">Setup</h1>
    <VideoPreview />
    <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className=' rounded-md bg-green-400 px-4 py-2.5' onClick={()=>{
            call.join();
            SetIsSetup(true);
      }} >
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
