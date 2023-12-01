"use client"
const { ethers } = require("ethers");
import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import Image from 'next/image'

import axios from 'axios';

//import {ethers} from 'ethers';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import abi from "../../new_collection/contract_abi.json";

export default function Page() {
    const pathname = usePathname();

    const [image, setImage] = useState<File>(new File([], ""));
    const [createObjectURL, setCreateObjectURL] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [botAddress, setBotAddress] = useState("");
    const [fee, setFee] = useState("");

    const [metadata, setMetadata] = useState("");

    const [ipfsImageUrl, setIpfsImageUrl] = useState("");
    const [ipfsMetaDataUrl, setIpfsMetaDataUrl] = useState("");

    const {config} = usePrepareContractWrite({
      address: "0x03BcC58C84D8C96557D0E53f1bB7AB01cAe0933A",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tURI",
            "type": "string"
          }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: "safeMint",
      args: [ipfsMetaDataUrl],
    })

    const {write} = useContractWrite(config);

    const uploadToClient = (event:any) => {
      if (event.target.files && event.target.files[0]) {
        const i:File = event.target.files[0];

        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };

    const deployBot = (imageUrl:string) => {
      alert(imageUrl);
      const metadata = {
        imageUrl: imageUrl,
        title: title,
        description: description,
        bot: botAddress,
        fee: fee,
      }

      var formData = new FormData();
      formData.append("Body", new File([JSON.stringify(metadata)], "foo.json"));
      formData.append("Key", "meta.json");
      formData.append("ContentType", "application/text");
      axios.post("https://api.quicknode.com/ipfs/rest/v1/s3/put-object", formData,
      {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_QUICKNODE_API_KEY,
        }
      }).then((r) => {
        console.log("DEBUG", r); 
        alert("META DATA WRITTEN");
        setIpfsMetaDataUrl(r.data.pin.cid);
        setTimeout(() => write?.(), 100);
      }).catch(e => {
        alert("Error");
        console.log("DEBUG", e)
      })
    }

    // https://quicknode.quicknode-ipfs.com/ipfs/
    const ipfsCreate = (fname: string, file: File) => {
      var formData = new FormData();

      formData.append("Body", file);
      formData.append("Key", fname);
      formData.append("ContentType", file.type);
      axios.post("https://api.quicknode.com/ipfs/rest/v1/s3/put-object", formData,
      {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_QUICKNODE_API_KEY,
        }
      }).then((r) => {
        console.log("DEBUG", r.data.pin.cid);
        deployBot(`https://quicknode.quicknode-ipfs.com/ipfs/${r.data.pin.cid}`);
      })
    }

    return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div>
            <Link href="/" className='hover:underline'>Home</Link> / <Link className='hover:underline' href="/dashboard">Dashboard</Link> / Collection / <Link className='hover:underline' href={`/dashboard/collection/${pathname.split("/")[3]}`}>{pathname.split("/")[3]}</Link>
            <form className='mt-10'>
              <p className='text-3xl mb-2 font-mono'>Release a Bot to Market</p>
              <label className='font-mono'>Thumbnail</label>
              <div className='flex'>
                <div className='w-[75%]'>
                  <input className='' type="file" name="myImage" onChange={uploadToClient} />
                </div>
                {createObjectURL ? <img className='justify-end w-[20%]' src={createObjectURL}/> : <></>}
              </div>
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Title' 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Description' 
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Bot Address' 
                type="text"
                onChange={(e) => setBotAddress(e.target.value)}
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Fee' 
                type="text"
                onChange={(e) => setFee(e.target.value)}
              />
              <div className='w-[100%] flex justify-end'>
                <button className='border border-b border-blue-600 bg-blue-500 pr-5 pl-5 p-1 hover:bg-blue-600'>Deploy Bot</button>
                <button onClick={(e) => {e.preventDefault();ipfsCreate("test.png", image)}} className='border border-b border-blue-600 bg-blue-500 pr-5 pl-5 p-1 hover:bg-blue-600'>Upload IPFS</button>
              </div>
            </form>
          </div>
          </div>
      </div>
    </main>
  )
}
