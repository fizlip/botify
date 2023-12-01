"use client"
import Image from 'next/image'

import BotCard from '../components/BotCard'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useContractRead, useWalletClient } from 'wagmi'

import abi from "./new_collection/contract_abi.json";

interface Props {
  address: string
}

const Collection: React.FC<Props> = ({address}) => {
  const [name, setName] = useState("");
  const { data, isError, isLoading } = useContractRead({
    address: address as `0x${string}`,
    abi:abi, 
    functionName: 'name',
    chainId: 80001,
    onSuccess(data) {
      setName(String(data));
    },
    onError(error) {
      console.log('DEBUG ERROR', error)
    },
  })

  useEffect(()  => {
  },[data])

  return (
    <tr className='border-b border-neutral-500 hover:border-white'>
      <td><Link href={`/dashboard/collection/${address}`} className='text-teal-300 underline'>{name}</Link></td>
      <td>15</td>
      <td>0.1</td>
      <td>{address}</td>
    </tr>
  )
}

export default function Home() {

  const [collections, setCollections] = useState<string[]>([]);

  useEffect(() => {
    const _collections = localStorage.getItem("collections")
    if(_collections) {
      setCollections(JSON.parse(_collections));
    }
  },[])

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
                {collections.reverse().map(c => {
                  return <Collection address={c}/>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
