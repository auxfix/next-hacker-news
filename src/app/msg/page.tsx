'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'news-app',
  brokers: [process.env.KAFKA_BROKER!],
})


export default function Home() {
    const [inMsg, setInMsg] = useState<string>('');
    const [outMsg, setOutMsg] = useState<string[]>([]);
    const kp = useRef<any>(null);
    const kc = useRef<any>(null);

    useEffect(() => {
        const producer = kafka.producer();
        const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID! })

        producer.connect().then(() => {
            kp.current = producer;
        })

        consumer.connect().then(() => {
            kc.current = consumer;
            kc.current.subscribe({ topic: process.env.KAFKA_MSG_TOPIC!, fromBeginning: true }).then(() => {
                kc.current.run({
                    eachMessage: async ({ topic, partition, message }: any) => {
                        setOutMsg([...outMsg, message])
                    },
                })
            });
        })
        
        return () => { 
            producer.disconnect();
            consumer.disconnect()
        } 
    },[])

    const sendMessage = async () => {
        kp.current.send({
            topic: process.env.KAFKA_MSG_TOPIC,
            messages: [
              { value: inMsg },
            ],
          })
      };

  return (
    <main className='bg-palegray p-0 items-center flex flex-col'>
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

