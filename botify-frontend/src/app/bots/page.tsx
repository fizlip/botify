"use client"
import Image from 'next/image'

import BotCard from '../components/BotCard'
import Link from 'next/link'

export default function Home() {

  const cards = [
    {name: "🐬 DELPHI: A delta neutral trading bot which min/maxes risk/return ", price: 1.0, thumbnail: "/bman.webp"},
    {name: "3.0.1. High volatiliy trading bot", price: 5.0, thumbnail: "/bman.avif"},
    {name: "🔥🔥🔥 BEST Discord AI-Enabled Chat Message Moderation BOT 2024 🔥🔥🔥", price: 0.3, thumbnail: "/discchatbot.jpg"},
    {name: "GF Simulator 3.0. LEVEL UP YOUR RIZZGAME WITH THIS PERFECT GF SIM!!", price: 1.0, thumbnail: "/gf.jpg"},
    {name: "X Virality Bot. My Bot will automatically create posts on your x account and make you go VIRAL!!!", price: 5.0, thumbnail: "/x-logo.avif"},
    {name: "This lil' dude will say hello to you.", price: 0.3, thumbnail: "/bman.jpg"},
    {name: "TikTok Marketing Bot, automatically create marketing material and publish it to TikTok ads.", price: 1.0, thumbnail: "/tiktok.webp"},
    {name: "Test bot, make a simple request that runs on a DON", price: 5.0, thumbnail: "/link.png"},
    {name: "Liam the Marketer, Supercharge your growth without HUGE overhead", price: 0.3, thumbnail: "/marketing.webp"},
  ]

  return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div><Link href="/" className='hover:underline'>Home</Link> / Bots</div>
          <div className='flex mb-[10%] w-[100%] border-2 border-blue-700 rounded'>
            <div className='flex-none w-[70%] p-10 bg-[#21b8ff]'>
              <p className='text-3xl font-bold'>Explore, Trade and Play!</p>
              <p className='text-xl'>From Trading bots to Discord bots, this place has it all...</p>
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
