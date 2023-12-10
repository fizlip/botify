"use client"
import Image from 'next/image'

import LinkBanner from './components/LinkBanner'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import Link from 'next/link'
import { FaRobot, FaTachometerAlt } from 'react-icons/fa'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
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

export default function Home() {

  const links: string[][] = [
    ["Social bots", "/dicsord.png"], 
    ["Trading", "/binance.png"], 
    ["AI", "/gpt-logo.png"],
    ["Automation Integrations", "/chimp.jpg"],
    ["Marketing", "/tiktok.webp"],
    ["Gaming", "/coc.jpg"],
    ["Blockchain", "/eth-logo.png"],
  ]; 

  return (
    <main className="">
      <div className='sticky top-0 z-10 p-2 absolute border border-neutral-900 left-0 font-mono bg-neutral-900 bg-opacity-50 w-[99vw]'>
        <div className='flex'>
          <p className='text-xl text-white font-bold'>🦾 BOTIFY</p>
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
      <div className='flex min-h-screen flex-col items-center justify-between pt-12 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <div className='flex mb-[10%] w-[100%] border-2 border-pink-500 rounded'>
            <div className='flex-none w-[35%] p-10 bg-pink-600'>
              <p className='text-3xl font-bold'>Buy and Sell Bots on the Blockchain</p>
              <p className='mt-5'>The global SaaS store</p>
              <div>
                <Link href="/bots">
                  <button className='pl-5 pr-5 mt-5 border hover:bg-white hover:text-black'>Shop now</button>
                </Link>
              </div>
            </div>
            <div className='flex-1'>
              <Image 
                  src="/bots.gif"
                  alt="pic"
                  className='rounded'
                  width={900}
                  height={600}
              />
            </div>
          </div>
          <h1 className='text-3xl mb-8 font-bold'>Explore Popular Categories</h1>
          <LinkBanner links={links}/>
          <div className='flex mt-[200px]'>
            <div className='m-auto'>
              <Image 
                  src="/micro.gif"
                  alt="pic"
                  className='rounded'
                  width={400}
                  height={600}
              />
            </div>
            <div className='m-auto p-5 w-[50%]'>
              <p className='text-xl'>Create a micro-SaaS in minutes.</p>
              <button className='pl-5 pr-5 border'>Start here</button>
            </div>
          </div>
          <div className='flex mt-[25%]'>
            <div className='m-auto'>
              <Image 
                  src="/buman.jpg"
                  alt="pic"
                  className='rounded'
                  width={400}
                  height={600}
              />
            </div>
            <div className='m-auto w-[50%] p-5'>
              <p className='text-xl'>Join the p2p marketplace (or the arena as we call it around here) and see how you compare with others.</p>
            </div>
          </div>
          <div className='flex mt-[25%]'>
            <div className='m-auto'>
              <p className='text-md'>{"-----------------------------------------------------------"}</p>
              <p className='text-md'>{"// .tsx"}</p>
              <p className='text-md text-teal-300'>{"<Botify botAddress='${BOT_ADDRESS}' />"}</p>
              <p className='text-md'>{"-----------------------------------------------------------"}</p>
              <p className='text-md'>{"// .js"}</p>
              <p className='text-md text-teal-300'>{"await fetch('https://botify.api/bots/${BOT_ADDRESS}')"}</p>
              <p className='text-md'>{"-----------------------------------------------------------"}</p>
              <p className='text-md'>{"// .py"}</p>
              <p className='text-md text-teal-300'>{"requests.get('https://botify.api/bots/BOT_ADDRESS')"}</p>
              <p className='text-md'>{"-----------------------------------------------------------"}</p>
              <p className='text-md'>{"// .sol"}</p>
              <p className='text-md text-teal-300'>{"IERC6551Account bot = IERC6551Account(BOT_ADDRESS)"}</p>
              <p className='text-md text-teal-300'>{"bot.executeFunction{value: PRICE}(args)"}</p>
              <p className='text-md'>{"-----------------------------------------------------------"}</p>

            </div>
            <div className='m-auto w-[50%] p-5'>
              <p className='text-xl'>Let others embed your micro-SaaS into websites, smart contracts, Discord bots and other third parties to get passive income!</p>
            </div>
          </div>
          <div className='mt-[100%]'>
            <p>"I'm in the arena trying stuff. Some will work, some won't. But always learning."  -- Chamath Palihapitiya</p>
          </div>
        </div>
      </div>
    </main>
  )
}
