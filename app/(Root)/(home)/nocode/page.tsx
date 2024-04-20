'use client';
      import HomeCard from '@/components/homecard';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

      const nocode = () => {
        const router = useRouter();
        return (
          <section className="flex size-full flex-col gap-5 text-white">
          <h1>NOCODE</h1>
          <div className=' flex  justify-evenly'>

             <HomeCard
        img="/icons/whiteboard.svg"
        title="Draw"
        description="Excel drawing tool"
        className=" bg-yellow-500"
        handleClick={() => router.push('/nocode/draw')}
      />
      <HomeCard
        img="/icons/nocode.svg"
        title="Notes"  
        description="Create notes"  
        className="  bg-red-500"
        handleClick={() => router.push('/nocode/Notes')}
      />
      <HomeCard
        img="/icons/nocode.svg"
        title="Todo"  
        description="Create Todo list"  
        className="  bg-blue-500"
        handleClick={() => router.push('/nocode/TODO')}
      />
          </div>
          </section>
        );
      };

      export default nocode;
          
    
