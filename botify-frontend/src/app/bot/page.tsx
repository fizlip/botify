"use client"
import Image from 'next/image'
import { useState } from 'react'

import { 
    usePrepareContractWrite, 
    useContractWrite,
    useWaitForTransaction,
    useAccount
} from 'wagmi'

import Link from 'next/link'
import { useDebounce } from './useDebounce';
import BotCard from '../components/BotCard'

export default function Home() {
    const [tokenId, setTokenId] = useState('')
    const debouncedTokenId = useDebounce(tokenId, 500)
    const { isConnected } = useAccount()

    const bots = [
        {name: "TikTok Marketing Bot, automatically create marketing material and publish it to TikTok ads.", price: 1.0, thumbnail: "/tiktok.webp"},
        {name: "Test bot, make a simple request that runs on a DON", price: 5.0, thumbnail: "/link.png"},
        {name: "🔥🔥🔥 BEST Discord AI-Enabled Chat Message Moderation BOT 2024 🔥🔥🔥", price: 0.3, thumbnail: "/discchatbot.jpg"},
    ]


    const { config } = usePrepareContractWrite({
        address: '0x113d6f9279544Bbf62eEAC10107DA1C8cF680Cb3',
        abi: [
        {
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "args",
				"type": "string[]"
			}
		],
		"name": "executeFunction",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	    }
        ],
        functionName: 'executeFunction',
        args: [BigInt('1'), [debouncedTokenId]],
    })

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        <main className="mb-10">
        <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
            <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
            <div><Link href="/" className='hover:underline'>Home</Link> / <Link href="/bots" className='hover:underline'>Bots</Link> / Test bot</div>
                <div className='grid grid-cols-2 gap-10 pt-10'>
                    <div>
                        <Image 
                            src="/bman.avif"
                            alt="pic"
                            className=''
                            width={400}
                            height={600}
                        />
                    </div>
                    <div>
                        <p className='text-4xl font-bold'>Test bot</p>
                        <div className='pt-10'>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                alert("write");
                                write?.();
                            }}>
                                <label htmlFor="tokenId">Token ID</label>
                                <input
                                    id="tokenId"
                                    onChange={(e) => setTokenId(e.target.value)}
                                    placeholder="420"
                                    value={tokenId}
                                    className="text-black"
                                />
                                <button disabled={!write || isLoading} className='cursor-pointer border w-[100%] hover:bg-white hover:text-black'>{isLoading ? "EXECUTING..."  : "EXECUTE" }</button>
                                {isSuccess && (
                                <div>
                                    Successfully minted your NFT!
                                    </div>
                                )}
                                {JSON.stringify(data)}
                            </form>
                        </div>
                    </div>
                </div>
                <div className='mt-[50%] flex font-mono pb-10'>
                    <p className='text-2xl font-bold'>Similar Bots </p>
                    <Link href="/bots" className='ml-10 text-xl hover:underline'>{'>'}See All</Link>
                </div>
                <div className='grid grid-cols-3 gap-20'>
                    {bots.map(card => {
                        return <BotCard name={card.name} price={card.price} thumbnail={card.thumbnail}/>
                    })}
                </div>
            </div>
        </div>
        </main>
    )
}


