import Image from 'next/image'

import LinkBanner from './components/LinkBanner'

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
      <div className='z-10 flex p-2 absolute border border-neutral-900 left-0 font-mono bg-neutral-900 bg-opacity-50 w-[100vw]'>
        <p className='text-xl text-white font-bold'>🦾 BOTIFY</p>
        <div className='flex-1 relative'>
          <div className='ml-[30%] w-[30%]'>
            <input placeholder='Search...' className='w-[100%] border border-neutral-800 rounded text-white bg-neutral-700 bg-opacity-50' type="text"/>
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
                <button className='pl-5 pr-5 mt-5 border'>Shop now</button>
              </div>
            </div>
            <div className='flex-1 bg-red-50'>
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
          <div>
            <LinkBanner links={links}/>
          </div>
        </div>
      </div>
    </main>
  )
}
