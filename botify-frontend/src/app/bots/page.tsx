"use client"
import Image from 'next/image'

import BotCard from '../components/BotCard'
import Link from 'next/link'
import { useContractReads } from 'wagmi'

export default function Home() {

  // Shows only preselected NFTs
  const cards = [
    {tokenId: 2, collectionAddress: "0xB8933dEB494f3Fc7C46dC670bBBbeC96abB3F1FC"},
    {tokenId: 3, collectionAddress: "0xB8933dEB494f3Fc7C46dC670bBBbeC96abB3F1FC"},
    {tokenId: 5, collectionAddress: "0xB8933dEB494f3Fc7C46dC670bBBbeC96abB3F1FC"},
    {tokenId: 6, collectionAddress: "0xB8933dEB494f3Fc7C46dC670bBBbeC96abB3F1FC"},
    {tokenId: 7, collectionAddress: "0xB8933dEB494f3Fc7C46dC670bBBbeC96abB3F1FC"},
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
              return <BotCard tokenId={card.tokenId} collectionAddress={card.collectionAddress as `0x${string}`}/>
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
