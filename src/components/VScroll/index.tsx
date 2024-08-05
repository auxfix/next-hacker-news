'use client'

import { useCallback, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateNewsItems } from '@/lib/query/queries'
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { getListItemstCountSelector, setListItemsCount } from '@/lib/redux/features/news';
import ScrollItem from '@/features/news/components/ListItem';


export default function VScroll() {
    const store = useAppStore();
    const scrollItemsCount = useAppSelector(getListItemstCountSelector);
    const { data: scrollList, isRefetching, isLoading } = useQuery({ 
        queryKey: ['vscroll'], 
        queryFn: () => generateNewsItems(scrollItemsCount),
    })

    const updateNewsCount = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        store.dispatch(setListItemsCount(+event.target.value))
    },[])

    useEffect(() => {
        if(isRefetching) {
            toast.loading('Getting latets news for you ...', {
                icon: <FaSpinner className="animate-spin" />,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                  padding: '20px',
                  fontSize: '14px',
                },
              });
        } else {
            toast.remove();
        }       
    }, [isRefetching])

    if (isLoading) {
        return (
          <div>
            <h1 className='absolute top-1/2 left-1/2 text-5xl font-bold
                bg-gradient-to-r from-blue-600 to-cyan-200 inline-block text-transparent bg-clip-text
                h-[5rem] -translate-x-[7rem]
            '>
                Loading...
            </h1>
          </div> 
        );
      }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="rounded-xl shadow-xl flex flex-col items-center justify-center p-6 bg-gray-100 w-1/3 mt-6">
                <input 
                    type="number"
                    min={1}
                    max={500}
                    step={5}
                    className="text-xl w-72 h-16 p-4 mt-4 border-2 border-sky-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                    value={scrollItemsCount} 
                    onChange={updateNewsCount}
                />
            </div>
            <div className='h-[75vh] w-1/3 overflow-y-auto mt-10 shadow-xl rounded-xl'>
                {scrollList?.listItems?.map(listItem => (
                    <ScrollItem
                        key={listItem.index} title={listItem.title} />
                ))}
            </div>
            <Toaster />
        </div>
    )
}