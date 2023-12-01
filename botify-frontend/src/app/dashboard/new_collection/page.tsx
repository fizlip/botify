"use client"
const { ethers } = require("ethers");
import Image from 'next/image'

//import {ethers} from 'ethers';

import Link from 'next/link'
import abi from './contract_abi.json';
import bytecode from './bytecode.json';

import { useAccount } from 'wagmi'
import { useWalletClient } from 'wagmi'

import { useEthersSigner } from './ethers';
import { useEthersProvider } from './provider';
import { useEffect, useState } from 'react';

import { useWaitForTransaction } from 'wagmi'

export default function Home() {

  const { address, isConnected } = useAccount()
  const signer = useEthersSigner();

  const [initialOwner, setInitialOwner] = useState(address);
  const [implementation, setImplementation] = useState("0x83d3B89584a542b833C982B52cB2FB812FBa1852");
  const [registry, setRegistry] = useState("0x4c9CE86AbB947D70C76134950fBAA273A2A4C7F8");
  const [maxSupply, setMaxSupply] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [ticker, setTicker] = useState("");

  const [createdContract, setCreatedContract] = useState("");

  
  const deployCollection = async () => {
    const contractFactory = new ethers.ContractFactory(abi, bytecode.bytecode,signer);

    const contract = await contractFactory.deploy(
      address, 
      implementation, 
      registry,
      100,
      tokenName,
      ticker
    );

    const add = await contract.getAddress();
    setCreatedContract(add);

    // Store in localStorage
    var colls = [add];
    const storage = localStorage.getItem("collections");
    if(storage) {
      colls = JSON.parse(storage);
      colls.push(add);
    }

    localStorage.setItem("collections", JSON.stringify(colls));

  }

  return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div><Link href="/" className='hover:underline'>Home</Link> / <Link className='hover:underline' href="/dashboard">Dashboard</Link> / New Collection</div>
          <div>
              <p className='text-3xl font-bold'>Create a new collection</p>
              <form className='mt-5'>
                <label>Initial Owner</label>
                <input 
                  className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                  placeholder='Initial owner' 
                  type="text"
                  value={initialOwner}
                />
                <label>ERC6551 Account Implementation</label>
                <input 
                  className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                  placeholder='ERC6551 implementation' 
                  type="text"
                  value={implementation}
                  onChange={(e) => setImplementation(e.target.value)}
                />
                <label>ERC6551 Registry</label>
                <input 
                  className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                  placeholder='ERC6551 Registry' 
                  type="text"
                  value={registry}
                  onChange={(e) => setRegistry(e.target.value)}
                />
                <label>Max Supply</label>
                <input 
                  className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                  placeholder='Max supply' 
                  type="text"
                  value={maxSupply}
                  onChange={(e) => setMaxSupply(e.target.value)}
                />
                <label>Collection Name</label>
                <input 
                  className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                  placeholder='Collection Name' 
                  type="text"
                  onChange={(e) => setTokenName(e.target.value)}
                />
                <label>Ticker</label>
                <input 
                  className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                  placeholder='Ticker' 
                  type="text"
                  onChange={(e) => setTicker(e.target.value)}
                />
                <div className='w-[100%] flex justify-end'>
                  <button className='border border-b border-blue-600 bg-blue-500 pr-5 pl-5 p-1 hover:bg-blue-600' onClick={(e) => {e.preventDefault();deployCollection()}}>Deploy Contract</button>
                </div>
              </form>
              {createdContract ?
              <p className='text-xl pt-6'>Your collection is being deployed at the address <b>{createdContract}</b>. It will be available shortly.</p>
              : 
              ""
              }
          </div>
        </div>
      </div>
    </main>
  )
}
