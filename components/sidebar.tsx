'use client'
import Sidebarlinks from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'


const Sidebar = () => {
    const pathname= usePathname();
  return (
    <section className=' sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px] '>
        <div className=' flex flex- flex-col gap-6'>
            {Sidebarlinks.map((link) => {
                const isActive = pathname === link.Route ;

                return(
                    <Link href={link.Route} 
                    key={link.label}
                    className={cn('flex gap-4 items-center p-4 rounded-lg justify-start ',{
                        'bg-blue-500': isActive,
                    } )}
                    >
                        <Image 
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
/>
<p className=' text-lg  font-semibold'>
{link.label}
</p>
                    </Link>
                    

                    
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar
