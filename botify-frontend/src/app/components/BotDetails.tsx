import { useContractReads} from "wagmi"

import abi from "../dashboard/new_collection/contract_abi.json";
import acc_abi from "./botaccount_abi.json";
import axios from "axios";
import { useState } from "react";
import { useBalance } from 'wagmi'

interface Props {
  tokenId:number,
  collectionAddress:`0x${string}`,
  _setType: (arg0: string) => void
  _setSecret: (arg0: string) => void
  _setImgUrl: (arg0: string) => void
  setSid: (arg0: string) => void
}

const BotDescription: React.FC<Props> = ({setSid, _setImgUrl, _setSecret, _setType, tokenId, collectionAddress}) => {

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const [tokenBalance, setTokenBalance] = useState("");
  const [URLsecret, setURLSecret] = useState("");
  const [botAddress, setBotAddress] = useState("");
  const [type, setType] = useState("");

  const [getAcc, setGetAcc] = useState(false);

  const _abi : any[] = abi;
  const _abi_acc : any[] = acc_abi;

  const _ = useBalance({
    address: tokenAccount as `0x${string}`,
    enabled: getAcc,
    onSuccess(data) {
      setTokenBalance(data.formatted)
    }
  })

  const c = useContractReads({
    contracts: [
      {
        address: tokenAccount as `0x${string}`,
        abi: _abi_acc,
        functionName: "botAddress",
        args:[]
      }
    ],
    onSuccess(data) {
      const _botAddress = data[0].result;
      if(_botAddress){
        setBotAddress(String(data[0].result));
      }
    },
    enabled: tokenAccount.length > 0
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
      },
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
      _setImgUrl(e.data.imageUrl)
      setTitle(e.data.title);
      setDescription(e.data.description);
      setFee(e.data.fee);
      setURLSecret(e.data.secret);
      _setSecret(String(e.data.secret));
      setSid(e.data.sid);
      if(e.data.type) {
        setType(e.data.type);
        _setType(e.data.type)
      }
      else{
        setType("pay-as-you-go");
        _setType("pay-as-you-go");
      }
    }).catch(e => {
      console.error(e);
    })
  }

  return (
    <div className='border-neutral-900 rounded flex w-[100%]'>
      <div className="w-[60%]">
        <img src={image} alt="img"/>
      </div>
      <div className="w-[40%] p-6 border border-neutral-600 rounded">
        <p className="text-3xl">{title}</p>
        <p className="text-base pt-4 pb-4">{description}</p>
        <div className="pt-[20%]">
          <p className="text-2xl font-mono">Fee: {fee}</p>
          <p className="text-xs font-mono">Type: {type}</p>
          <p className="text-xs font-mono">Token ID: {tokenId}</p>
          <p className="text-xs font-mono">Token Account: {tokenAccount}</p>
          <p className="text-xs font-mono">Bot address: {botAddress}</p>
        </div>
      </div>
    </div>
  )
}

export default BotDescription;