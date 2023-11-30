"use client"
const { ethers } = require("ethers");
import { createHelia } from 'helia'
import Image from 'next/image'

//import {ethers} from 'ethers';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Page() {
    const pathname = usePathname();

    void createHelia()
    .then(helia => {
      console.info('Helia is running')
      console.info('PeerId:', helia.libp2p.peerId.toString())
    })

    return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div>
            <Link href="/" className='hover:underline'>Home</Link> / <Link className='hover:underline' href="/dashboard">Dashboard</Link> / Collection / <Link className='hover:underline' href={`/dashboard/collection/${pathname.split("/")[3]}`}>{pathname.split("/")[3]}</Link>
            <form className='mt-10'>
              <p className='text-3xl mb-2 font-mono'>Release a Bot to Market</p>
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Image URL (thumbnail)' 
                type="text"
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Title' 
                type="text"
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Description' 
                type="textarea"
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Bot Address' 
                type="text"
              />
              <div className='w-[100%] flex justify-end'>
                <button className='border border-b border-blue-600 bg-blue-500 pr-5 pl-5 p-1 hover:bg-blue-600'>Deploy Bot</button>
              </div>
            </form>
          </div>
          </div>
      </div>
    </main>
  )
}
