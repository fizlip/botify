"use client"
import Image from 'next/image'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { configureChains, useAccount, useConnect, useDisconnect } from 'wagmi'
import { WagmiConfig, createConfig, mainnet} from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Link from 'next/link'
import { publicProvider } from '@wagmi/core/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [infuraProvider({ apiKey: '01797887c8e74a4d93a0fd25c15b0b56' })],
)

const config = createConfig({
  connectors: [new InjectedConnector({chains})],
  publicClient
})

function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector({chains}),
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
          <div className='inline-block h-8 w-8 rounded-full bg-red-600 p-1 mr-2'><p className='text-center'>NEW</p></div>
          <div className='p-1 mr-0'>
            <WagmiConfig config={config}>
              <Profile />
            </WagmiConfig>
          </div>
        </div>
      </div>
        <div className=''>
            <WagmiConfig config={config}>
                {children}
            </WagmiConfig>
        </div>
      </body>
    </html>
  )
}


export default RootLayout;