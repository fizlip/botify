"use client"
import Image from 'next/image'

import LinkBanner from '../components/LinkBanner'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { SiChainlink } from "react-icons/si";
import Link from 'next/link'
import { TfiMedallAlt } from "react-icons/tfi";

interface Props {
  name:string,
  price: number,
  thumbnail: string,
}

const BotCard: React.FC<Props> = ({name, price, thumbnail}) => {
  return (
    <div className='border p-2 border-neutral-900 rounded'>
      <Image 
          src={thumbnail}
          alt="pic"
          className='rounded'
          width={600}
          height={600}
      />
      <p className='text-xl'>{name}</p>
      <p className='font-mono text-xl font-bold pt-5 flex'>{price} LINK/request</p>
      <p className='font-mono'>10 requests FREE</p>
      <p className='pt-5 text-teal-500 font-bold'>352 requests made</p>
      <p className='font-mono flex'>Owner: 0x0a99...4098 <TfiMedallAlt color="red"/></p>
    </div>
  )
}

export default function Home() {

  const cards = [
    {name: "Ruxin34 x Sassyotto COC MEGA MYSTERY BOT 2.0! 6 Booster Requests + 1 Bonus", price: 1.0, thumbnail: "/coc.jpg"},
    {name: "Pancakeswap Bot Buy And Sell Crypto With Just One Click 2022", price: 5.0, thumbnail: "/pan.png"},
    {name: "🔥🔥🔥 BEST Discord AI-Enabled Chat Message Moderation BOT 2024 🔥🔥🔥", price: 0.3, thumbnail: "/discchatbot.jpg"},
    {name: "GF Simulator 3.0. LEVEL UP YOUR RIZZGAME WITH THIS PERFECT GF SIM!!", price: 1.0, thumbnail: "/gf.jpg"},
    {name: "X Virality Bot. My Bot will automatically create posts on your x account and make you go VIRAL!!!", price: 5.0, thumbnail: "/x-logo.avif"},
    {name: "", price: 0.3, thumbnail: "/discchatbot.jpg"},
    {name: "TikTok Marketing Bot, automatically create marketing material and publish it to TikTok ads.", price: 1.0, thumbnail: "/tiktok.webp"},
    {name: "Pancakeswap Bot Buy And Sell Crypto With Just One Click 2022", price: 5.0, thumbnail: "/pan.png"},
    {name: "🔥🔥🔥 BEST Discord AI-Enabled Chat Message Moderation BOT 2024 🔥🔥🔥", price: 0.3, thumbnail: "/discchatbot.jpg"},

  ]

  return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div><Link href="/" className='hover:underline'>Home</Link> / Bots</div>
          <div className='flex mb-[10%] w-[100%] border-2 border-blue-700 rounded'>
            <div className='flex-none w-[70%] p-10 bg-[#21b8ff]'>
              <p className='text-3xl font-bold'>Explore, Trade and Play!</p>
              <p className='text-xl'>From Trading bots to Pokèmon Go bots, this place has it all...</p>
            </div>
            <div className='flex-1'>
              <Image 
                  src="/bot.gif"
                  alt="pic"
                  className=''
                  width={400}
                  height={600}
              />
            </div>
          </div>
          <div className='grid grid-cols-3 gap-10'>
            {cards.map(card => {
              return <BotCard name={card.name} price={card.price} thumbnail={card.thumbnail}/>
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
