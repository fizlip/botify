import Link from "next/link"
import Image from 'next/image'
import { TfiMedallAlt } from "react-icons/tfi"
import { useContractRead, useContractReads} from "wagmi"

import abi from "../dashboard/new_collection/contract_abi.json";
import axios from "axios";
import { useState } from "react";
import { useBalance } from 'wagmi'

interface Props {
  tokenId:number,
  collectionAddress:`0x${string}`,
}

const BotDescription: React.FC<Props> = ({tokenId, collectionAddress}) => {

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");

  const [getAcc, setGetAcc] = useState(false);

  const _abi : any[] = abi;

  const _ = useBalance({
    address: tokenAccount as `0x${string}`,
    enabled: getAcc,
    onSuccess(data) {
      setTokenBalance(data.formatted)
    }
  })

  const {data, isError, isLoading} = useContractReads({
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

    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <Link href="/bot">
      <div className='border p-2 border-neutral-900 rounded hover:border-teal-700 cursor-pointer'>
        <img src={image} alt="img"/>
        <p className="text-2xl">{title}</p>
        <p className="text-md font-mono">Fee: {fee}</p>
        <p className="text-xs font-mono">Token ID: {tokenId}</p>
        <p className="text-xs font-mono">Account: {tokenAccount}</p>
        <p className="text-xs font-mono text-green-500 font-bold">Balance: {tokenBalance} ETH</p>
      </div>
    </Link>
  )
}

export default BotDescription;