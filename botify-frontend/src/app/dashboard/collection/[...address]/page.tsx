"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BotDescription from '@/app/components/BotDescription';
import { useContractReads } from 'wagmi';

import abi_multicall from "../../new_collection/contract_abi.json";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home({ params }: { params: { slug: string } }) {
    const pathname = usePathname();
    const address = pathname?.split("/")[3]
    const abi_n : any[] = abi_multicall;

    const [totalSupply, setTotalSupply] = useState("");
    const [maxSupply, setMaxSupply] = useState("");
    const [chainId, setChainId] = useState("");
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");

    const { data, isError, isLoading } = useContractReads({
      contracts: [
        {
          address: address as `0x${string}`,
          abi: abi_n,
          functionName: "totalSupply",
        },
        {
          address: address as `0x${string}`,
          abi: abi_n,
          functionName: "maxSupply",
        },
        {
          address: address as `0x${string}`,
          abi: abi_n,
          functionName: "chainId",
        },
        {
          address: address as `0x${string}`,
          abi: abi_n,
          functionName: "name",
        },
        {
          address: address as `0x${string}`,
          abi: abi_n,
          functionName: "symbol",
        },
      ],
      onSuccess(data) {
        console.log(data);
        setTotalSupply(String(data[0].result));
        setMaxSupply(String(data[1].result));
        setChainId(String(data[2].result));
        setName(String(data[3].result));
        setSymbol(String(data[4].result));
      }
    })

    useEffect(() => {
    }, [totalSupply])

    return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div><Link href="/" className='hover:underline'>Home</Link> / <Link className='hover:underline' href="/dashboard">Dashboard</Link> / Collection / <Link className='hover:underline' href={`/dashboard/collection/${pathname?.split("/")[3]}`}>{pathname?.split("/")[3]}</Link></div>
          <p className='font-mono text-3xl'>{name} ({symbol})</p>
          <div className=' font-mono grid grid-cols-6 gap-5 border-b border-t'>
            <p>Total Supply: {totalSupply}</p>
            <p>Max Supply: {maxSupply}</p>
            <p>ChainId: {chainId}</p>
          </div>
          <div className='flex mt-20'>
            <div className='mb-0 w-[87%]'><p className='text-2xl font-mono'>Bots</p></div>
            <div className='m-auto'>
              <Link href={`/dashboard/mint/${pathname?.split("/")[3]}`} className='bg-blue-500 pr-5 pl-5'>Create New</Link>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-10'>
            {parseInt(totalSupply) > 0 ? Array.from(Array(parseInt(totalSupply)).keys()).map(id => {
              return <BotDescription tokenId={id} collectionAddress={pathname?.split("/")[3] as `0x${string}`}/>
            }): <></>}
          </div>
        </div>
      </div>
    </main>
  )
}
