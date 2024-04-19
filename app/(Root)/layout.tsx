import StreamVedioProvider from '@/Providers/StreamClientProvider'
import { StreamCallProvider, StreamVideoProvider } from '@stream-io/video-react-sdk'
import React, { ReactNode } from 'react'

function RootLayout({children}:{children:ReactNode}) {
  return (
    
      <main>
        <StreamVedioProvider>
        {children}
        </StreamVedioProvider>
      </main>
   
  )
}

export default RootLayout
