import Link from "next/link"
import Image from 'next/image'
import { TfiMedallAlt } from "react-icons/tfi"
import { useState } from "react"
import { useContractReads } from "wagmi"

import abi from "../dashboard/new_collection/contract_abi.json";
import axios from "axios"

interface Props {
  tokenId: number,
  collectionAddress: `0x${string}`
}

const BotCard: React.FC<Props> = ({tokenId, collectionAddress}) => {

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [description, setDescription] = useState("");

  const [getAcc, setGetAcc] = useState(false);


  const _abi : any[] = abi;

  const a = useContractReads({
    contracts: [
      {
        address: collectionAddress,
        abi: _abi, 
        functionName: "tokenURI",
        args: [tokenId as any]
      },
      {
        address: collectionAddress,
        abi: _abi,
        functionName: "getAccount",
        args: [tokenId as any]
      }
    ],
    onSuccess(data) {
      const tokenURI = data[0].result;
      if(tokenURI) {
        getMetaData(String(tokenURI));
      }

      const account:string = String(data[1].result);
      if(account) {
        setTokenAccount(account);
        setGetAcc(true);
      }

    }
  })

  const getMetaData = (cid: string) =>  {
    axios.get("https://quicknode.quicknode-ipfs.com/ipfs/" + cid).then(e => {
      setImage(e.data.imageUrl)
      setTitle(e.data.title);
      setFee(e.data.fee);
      setDescription(e.data.description);

    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <Link href={`/bot/${collectionAddress}/${tokenId}`}>
      <div className='border p-2 border-neutral-900 rounded hover:border-teal-700 cursor-pointer'>
        <img
            src={image}
            alt="pic"
            className='rounded'
        />
        <p className='text-xl'>{title}</p>
        <p className='text-sm'>{description}</p>
        <p className='font-mono text-xl font-bold pt-5 flex'>{fee} LINK/request</p>
        <p className='font-mono'>10 requests FREE</p>
        <p className='pt-5 text-teal-500 font-bold'>352 requests made</p>
        <p className='font-mono flex'>Owner: 0x0a99...4098 <TfiMedallAlt color="red"/></p>
      </div>
    </Link>
  )
}

export default BotCard;