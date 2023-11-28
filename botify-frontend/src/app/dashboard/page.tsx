"use client"
import Image from 'next/image'

import BotCard from '../components/BotCard'
import Link from 'next/link'

export default function Home() {

  return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div><Link href="/" className='hover:underline'>Home</Link> / Dashboard </div>
          <div className='flex mb-[10%] w-[100%] border-2 border-yellow-300 rounded'>
            <div className='flex-none w-[80%] p-10 bg-[#fff6d3] text-black'>
              <p className='text-3xl font-bold'>Management Console.</p>
              <p className='text-xl'>Use this page to create new bots or manage existing ones.</p>
            </div>
            <div className='flex-1'>
              <Image 
                  src="/factory.gif"
                  alt="pic"
                  className=''
                  width={400}
                  height={600}
              />
            </div>
          </div>
          <div>
            <div className='flex'>
              <p className='text-2xl w-[80%]'>Collections</p>
              <Link href="/dashboard/new_collection" className='bg-blue-500 rounded-md pl-5 pr-5 border-2 border-blue-600 hover:bg-blue-700'>Create new collection</Link>
            </div>
            <table className='w-[100%]'>
              <thead>
                <tr className='text-left border-b border-t'>
                  <th>Name</th>
                  <th>Count</th>
                  <th>Floor</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b border-neutral-500 hover:border-white'>
                  <td><Link href="/" className='text-teal-300 underline'>Marketing</Link></td>
                  <td>15</td>
                  <td>0.1</td>
                  <td>0x00000000</td>
                </tr>
                <tr className='border-b border-neutral-500 hover:border-white'>
                  <td><Link href="/" className='text-teal-300 underline'>Cool Traders</Link></td>
                  <td>15</td>
                  <td>0.1</td>
                  <td>0x00000000</td>
                </tr>
                <tr className='border-b border-neutral-500 hover:border-white'>
                  <td><Link href="/" className='text-teal-300 underline'>Agents</Link></td>
                  <td>15</td>
                  <td>0.1</td>
                  <td>0x00000000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
