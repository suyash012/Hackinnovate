import CallList from '@/components/CallList'
import React from 'react'

const upcoming = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
        <h1 className="text-4xl font-bold">Upcoming</h1>
        < CallList type="upcoming" />
    </section>
  )
}

export default upcoming
