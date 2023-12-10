import { NextRequest, NextResponse } from 'next/server'
import { headers } from "next/headers";
import { createWalletClient, http  } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { Core } from '@quicknode/sdk';
import { polygonMumbai } from 'viem/chains'; // Change the network as needed

import abi from "./botaccount_abi.json";
 
export async function GET(
  req,
) {

  const headersList = headers();

  const _abi = abi;

  const botAccount = String(req.nextUrl.searchParams.get("account"));
  const pv = String(headersList.get("Authorization")?.split(" ")[1]);
  const args = JSON.parse(String(headersList.get("Args")));

  const rpcUrl = process.env.NEXT_PUBLIC_RPC;

  const privateKey = '0x' + pv;

  // Convert the private key to an account object
  const account = privateKeyToAccount(privateKey);

  // Initialize the clients
  const core = new Core({
    endpointUrl: rpcUrl,
  });  

  const walletClient = createWalletClient({ account, chain: polygonMumbai, transport: http(core.endpointUrl) });

  const { request } = await core.client.simulateContract({
    address: botAccount,
    abi: _abi,
    functionName: 'executeFunction',
    args: [639, args],
    account
  });
      
  const response = await walletClient.writeContract(request);
  console.log('Transaction sent. Transaction hash:', response);

  return NextResponse.json({ message: "Execute: " + botAccount + " hash: " + response});
}