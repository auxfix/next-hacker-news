'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { socket } from '@/services/socket';

export default function Home() {
    const [inMsg, setInMsg] = useState('');
    const outMsgRef = useRef<string[]>([])
    const [outMsg, setOutMsg] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
  
    useEffect(() => {
      if (socket.connected) {
        onConnect();
      }
  
      function onConnect() {
        setIsConnected(true);
        setTransport(socket.io.engine.transport.name);
        socket.on("inform_client", (msg) => {
          outMsgRef.current = [...outMsgRef.current, msg];
          setOutMsg(outMsgRef.current)
        });
        socket.io.engine.on("upgrade", (transport) => {
          setTransport(transport.name);
        });
      }
  
      function onDisconnect() {
        setIsConnected(false);
        setTransport("N/A");
      }
  
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }, []);

    const sendMessage = () => {
        console.log('snd', inMsg)
        socket.emit("inform_server", inMsg);
    };

  return (
    <main className='bg-palegray p-0 items-center flex flex-col'>
      <div>
        <p>Status: { isConnected ? "connected" : "disconnected" }</p>
        <p>Transport: { transport }</p>
      </div>
      <div className='flex justify-between w-full'>
        <div className='w-full pl-5'>
            <div className='flex h-20 w-full items-center justify-between'>
                <div className='flex items-center'>
                    <h2 className='font-bold text-2xl pr-10 pl-2'>Send OUT</h2>
                    <button className='bg-blue-500 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex'
                        onClick={() => sendMessage()}
                    >
                        Send 
                    </button>
                </div>
            </div>
            <textarea 
                value={inMsg}
                onChange={(event) => { setInMsg(event.target.value); }}
                style={{ minHeight: "calc(100vh - 20rem)" }}
                className="block h-full w-[98%] py-2 leading-tight bg-gray-100 border border-gray-300 
                rounded resize-none focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>
        <div className='w-full' >
            <div className='flex h-20 w-full items-center justify-between'>
                <div className='flex items-center'>
                    <h2 className='font-bold text-2xl pr-5 pl-2'>Recieved</h2>
                </div>
                <Link className='font-bold py-2 pr-7 rounded ml-10 flex text-black font-bold text-4xl' href="/">{'<-'}</Link>
            </div>
            <textarea 
                onChange={() => {}}
                value={JSON.stringify(outMsg, null, 2)}
                style={{ minHeight: "calc(100vh - 20rem)" }}
                className="block h-full w-[98%] py-2 leading-tight bg-gray-100 border border-gray-300 
                rounded resize-none focus:outline-none focus:bg-white focus:border-blue-500" />
        </div>
      </div>
    </main>    
  );
}

