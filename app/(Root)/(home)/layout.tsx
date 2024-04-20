import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import React, { ReactNode } from 'react'


function HomeLayout({children}:{children:ReactNode}) {
  return (
    <div className='text-black'>
      <main className=' relative'>
        <Navbar/>
        <div className=' flex'>
            <Sidebar/>
        
        <section className=' flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 '>
<div className='w-full'>

        {children}
</div>
        </section>
        </div>
      </main>
    </div>
  )
}

export default HomeLayout