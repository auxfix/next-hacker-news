'use client'

import React from 'react';
import Link from 'next/link';


export default function Dev() {
  return (
    <main className="bg-gradient-to-r from-blue-200 to-green-200 p-8 rounded-lg shadow-lg flex flex-col items-center justify-start s">
      <div className="flex flex-col items-center justify-center space-y-6 border-4 border-blue-400 rounded-lg p-6 w-[400px]">
        <div className="w-full flex justify-center">
          <Link href="/export">
            <button className="min-w-[300px] text-lg text-white bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              DB CRUD Operations
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Link href="/msg">
            <button className="min-w-[300px] text-lg text-white bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Kafka Based Messaging
            </button>
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <Link href="/">
            <button className="min-w-[300px] text-lg text-blue-700 hover:text-blue-900 transition duration-300 ease-in-out bg-white hover:bg-gray-100 py-3 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

