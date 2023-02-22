import '../styles/global.css'

import { Inter } from '@next/font/google'
import { Header } from '@/components/Header'
import { Menu } from '@/components/Menu'
import { Explorer } from '@/components/Explorer'

import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Marcos Paulo',
    template: '%s | Marcos Paulo'
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="bg-[#7F7FD5] bg-app">
        <div className="z-10 relative h-full px-20 py-[10px] flex items-center justify-center">
          <div className="bg-[#232135] overflow-hidden border border-[#72707D] w-full max-w-[1480px] h-screen shadow-md shadow-black/20 rounded-lg grid grid-rows-layout">
            <Header />

            <div className="grid grid-cols-editor max-h-full">
              <Menu />
              <Explorer />

              <div className="h-full relative">
                {children}
              </div>
            </div>


          </div>
        </div>
      </body>
    </html>
  )
}
