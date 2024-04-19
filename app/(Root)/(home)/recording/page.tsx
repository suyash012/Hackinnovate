import CallList from '@/components/CallList'
import React from 'react'

const recording = () => {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
        <h1 className="text-4xl font-bold">Recording</h1>
        <   CallList type="recordings" />
    </section>
  )
}

export default recording
