"use client"
import Image from 'next/image'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Link from 'next/link'
import { FaTachometerAlt } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { polygonMumbai } from 'viem/chains'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygonMumbai,
    transport: http()
  }),
})

function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
 
  if (isConnected)
    return (
      <div className='flex'>
        <div>
          <Image 
            src="/chimp.jpg"
            width={30}
            height={10}
            alt="pic"
            className="rounded-full"
            objectFit='contain'
            layout="fixed"
          />
        </div>
        <div className='text-mono text-sm pt-1 pl-2'>
          {address?.slice(0,6)}
          ...
          {address?.slice(-4)}
        </div>
        <div>
          <button onClick={() => disconnect()}></button>
        </div>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({children}) => {
  return (
    <html lang="en">
      <body>
      <div className='sticky top-0 z-10 p-2 absolute border border-neutral-900 left-0 font-mono bg-neutral-900 bg-opacity-50 w-[99vw]'>
        <div className='flex'>
          <Link href="/">
            <p className='text-xl text-white font-bold'>🦾 BOTIFY</p>
          </Link>
          <div className='flex-1 relative'>
            <div className='ml-[40%] w-[30%]'>
              <input placeholder='Search...' className='w-[100%] border border-neutral-800 rounded text-white bg-neutral-700 bg-opacity-50' type="text"/>
            </div>
          </div>
          <div className='inline-block h-8 w-8 rounded-full bg-blue-600 p-2 mr-2'><Link href="/bots" className='text-center'><FaRobot/></Link></div>
          <div className='inline-block h-8 w-8 rounded-full bg-pink-600 p-2 mr-2'><Link href="/dashboard" className='text-center'><FaTachometerAlt /></Link></div>
          <div className='p-1 mr-0'>
            <WagmiConfig config={config}>
              <Profile />
            </WagmiConfig>
          </div>
        </div>
      </div>
      <div className='flex ml-20'>
        <div className='font-mono flex-l h-[100vh] pt-[20%] pl-20'>
          <div className='text-sm'>
            <p className='text-xl font-bold'>All categories</p>
            <p>Social</p>
            <p>Trading</p>
            <p>Marketing</p>
            <p>AI</p>
          </div>
          <div className='text-sm mt-10'>
            <p className='text-xl font-bold'>Price</p>
            <p>Under 0.2 LINK </p>
            <p>Between 0.2 LINK and 1 LINK</p>
            <p>More than 1 LINK</p>
          </div>
        </div>
        <div className='ml-[10%]'>
          <WagmiConfig config={config}>
            {children}
          </WagmiConfig>
        </div>
      </div>
      </body>
    </html>
  )
}


export default RootLayout;