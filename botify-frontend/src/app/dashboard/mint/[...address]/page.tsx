"use client"
import Image from 'next/image'

import axios from 'axios';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';

export default function Page() {

    const { address, isConnected } = useAccount() 
    const pathname                 = usePathname();

    const [image, setImage]                     = useState<File>(new File([], ""));
    const [createObjectURL, setCreateObjectURL] = useState("");

    const [title, setTitle]             = useState("");
    const [description, setDescription] = useState("");
    const [botAddress, setBotAddress]   = useState("");
    const [fee, setFee]                 = useState("");
    const [secret, setSecret]           = useState("");
    const [type, setType]               = useState("payg");
    const [sid, setSid]                 = useState("");

    const [ipfsMetaDataUrl, setIpfsMetaDataUrl] = useState("");

    const {data, isLoading, isSuccess, write} = useContractWrite({
      address: pathname?.split("/")[3] as `0x${string}`,
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tURI",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_botAddress",
            "type": "address"
          }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }],
      functionName: "safeMint",
    })

    const uploadToClient = (event:any) => {
      if (event.target.files && event.target.files[0]) {
        const i:File = event.target.files[0];

        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };

    /**
     * deployBot will deploys the .json metadata to IPFS
     * @param imageUrl 
     */
    const deployBot = async (imageUrl:string) => {
      var metadata = {
        imageUrl: imageUrl,
        title: title,
        description: description,
        bot: botAddress,
        fee: fee,
        secret: secret,
        type: type,
        sid: sid
      }

      var formData = new FormData();
      formData.append("Body", new File([JSON.stringify(metadata)], "foo.json"));
      formData.append("Key", "meta.json");
      formData.append("ContentType", "application/text");
      const r = await axios.post("https://api.quicknode.com/ipfs/rest/v1/s3/put-object", formData,
      {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_QUICKNODE_API_KEY,
        }
      })

      setIpfsMetaDataUrl((p) => p = r.data.pin.cid);
      write({args: [r.data.pin.cid, botAddress as `0x${string}`]});
    }

    /**
     * ipfsCreate will upload the thumbnail for the new token to IPFS
     * @param fname -- name of file
     * @param file -- binary
     * @returns 
     */
    const ipfsCreate = (fname: string, file: File) => {
      var formData = new FormData();

      formData.append("Body", file);
      formData.append("Key", fname);
      formData.append("ContentType", file.type);
      return axios.post("https://api.quicknode.com/ipfs/rest/v1/s3/put-object", formData,
      {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_QUICKNODE_API_KEY,
        }
      })
    }

    useEffect(() => {
        if(data?.hash && isSuccess) {
            setTimeout(() => window.location.href = `${window.location.origin}/dashboard`, 10000);
        }
    },[isSuccess])

    return (
    <main className="mb-10">
      <div className='flex min-h-screen flex-col items-center justify-between pt-2 p-rl-24'>
        <div className="z-9 max-w-5xl w-full items-center justify-between text-sm">
          <div>
            <Link href="/" className='hover:underline'>
              Home
            </Link> / 
            <Link className='hover:underline' href="/dashboard">
              Dashboard
            </Link> / Collection / 
            <Link className='hover:underline' href={`/dashboard/collection/${pathname?.split("/")[3]}`}>
              {pathname?.split("/")[3]}
            </Link>
            { isConnected ?
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
                placeholder='Subscription ID' 
                type="text"
                onChange={(e) => setSid(e.target.value)}
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Fee' 
                type="text"
                onChange={(e) => setFee(e.target.value)}
              />
              <input 
                className='w-[100%] bg-neutral-800 p-2 mb-5 text-white' 
                placeholder='Encrypted Secrets Url (Optional)' 
                type="text"
                onChange={(e) => setSecret(e.target.value)}
              />
              <div className='flex'>
                <div>
                  <input onChange={(e) => setType("payg")} checked={type=="payg"} type="radio" value="payg"/>
                  <label>Pay-as-you-go</label>
                </div>
                <div>
                  <input onChange={(e) => {setType("pays")}} type="radio" checked={type=="pays"} value="pays"/>
                  <label>Pay per session</label>
                </div>
                <div>
                  <input onChange={(e) => setType("ai")} type="radio" checked={type=="ai"} value="ai"/>
                  <label>AI bot</label>
                </div>
                <div>
                  <input onChange={(e) => setType("trading")} type="radio" checked={type=="trading"} value="trading"/>
                  <label>Trading bot</label>
                </div>
              </div>
              <div className='w-[100%] flex justify-end'>
                <button 
                  disabled={!write} 
                  onClick={(e) => {e.preventDefault();ipfsCreate(image.name, image).then(e => deployBot(`https://quicknode.quicknode-ipfs.com/ipfs/${e.data.pin.cid}`))}} 
                  className='border border-b border-blue-600 bg-blue-500 pr-5 pl-5 p-1 hover:bg-blue-600'>
                    Deploy
                  </button>
              </div>
              <div>
                {isLoading ? 
                  <div>
                    <Image 
                      src="/loading.gif"
                      alt="pic"
                      className='m-auto'
                      width={800}
                      height={600}
                    /> 
                    <p>Mint in progress</p>
                  </div>
                  :
                  <p></p>
                }
              </div>
            </form>
            :
            <div>
              <p className='text-red-500 text-center text-4xl font-mono mt-5 font-bold'>PLEASE CONNECT TO A WALLET TO MINT A NEW BOT.</p>
              <Image 
                  src="/comp.gif"
                  alt="pic"
                  className='m-auto'
                  width={800}
                  height={600}
              />
            </div>
            }
          </div>
          </div>
      </div>
    </main>
  )
}
