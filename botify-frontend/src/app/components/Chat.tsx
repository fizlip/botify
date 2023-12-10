import { useState } from "react";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { useContractReads } from "wagmi";

interface Props {
    imageUrl: string,
    botAddress:string
}

const Chat: React.FC<Props> = ({imageUrl, botAddress}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [response, setResponse] = useState("");
    const [systemPrompt, setSystemPrompt] = useState("");

    const [prompt, setPrompt] = useState("");

    const [systemResponses, setSystemResponses] = useState<string[]>([systemPrompt]);

    const {data, isError, isLoading} = useContractReads({
        contracts: [
        {
            address: botAddress as `0x${string}`,
            abi: [{
                "inputs": [],
                "name": "system_prompt",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }],
            functionName: "system_prompt",
            args: []
        },
        ],
        onSuccess(data) {
            const d = data[0]?.result;
            if(d){
                setSystemPrompt(String(d));
                setSystemResponses([String(d)]);
            }

        }
    })

    const handleRequest = async (handleResponse: (s:any) => void, prompt: string) => {
        var _tmp = systemResponses;
        _tmp.push(prompt);
        const model = new ChatOpenAI({
            openAIApiKey: process.env.NEXT_PUBLIC_OPEANAI_API_KEY, 
            temperature: 0.9,
            streaming: true,
            callbacks: [{
                handleLLMNewToken(token: string) {
                    console.log(token);
                    handleResponse(token);
                }
            }]
        })
        return await model.call(_tmp)
    }

    const send = () => {
        setPrompt(""); 
        handleRequest((e) => setResponse(p => p += e), prompt).then(r => { setSystemResponses(p => [...p, String(r.content)]); setResponse("")}); 
    }

    return (
        <div className="border border-neutral-800 p-2 rounded">
            CHAT
            <div>
                {systemResponses.slice(1).map((e,i) => {
                    if(i % 2 != 0){
                        return (
                        <div className="grid grid-cols-12 gap-5 mt-5">
                            <div className="col-span-1">
                                <img className="rounded w-[100px]" src={imageUrl}/>
                            </div>
                            <div className="col-span-7">
                                <p>{e}</p>
                            </div>
                        </div>
                        )
                    }
                    else {
                        return (
                        <div className="grid grid-cols-12 gap-5 mt-5">
                            <div className="text-right col-start-5 col-span-7">
                                <p>{e}</p>
                            </div>
                            <div className="col-span-1">
                                <img className="rounded w-[100px]" src="/bman.jpg"/>
                            </div>
                        </div>
                        )
                    }
                })}
                <div className="grid grid-cols-12 gap-5">
                    {response.length> 0 ?
                        <div className="col-span-1">
                            <img className="rounded w-[100px]" src={imageUrl}/>
                        </div>
                        :
                        <></>
                    }
                    <div className="col-span-11 text-l">
                        <p>{response}</p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <input value={prompt} onKeyDown={(e) => {if(e.key === "Enter"){send();setPrompt("")}}} onChange={(s) => setPrompt(s.target.value)} className="w-[90%] mt-10 bg-neutral-900 p-2" type="text"/>
                <button className="mt-10 w-[10%]" onClick={() => send()}>SEND</button>
            </div>
        </div>
    )
}

export default Chat;