'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateNewsItems } from '@/lib/query/queries'
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { getListItemstCountSelector, setListItemsCount } from '@/lib/redux/features/news';
import ScrollItem from '@/features/news/components/ListItem';
import Button from '../SimpleButton';


export default function VScroll() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const store = useAppStore();
    const scrollItemsCount = useAppSelector(getListItemstCountSelector);
    const [ scrollTag, setScrollTag ] = useState(5);
    const { data: scrollList, isRefetching, isLoading } = useQuery({ 
        queryKey: ['vscroll'], 
        queryFn: () => generateNewsItems(scrollItemsCount),
    })

    const updateNewsCount = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        store.dispatch(setListItemsCount(+event.target.value))
    },[])

    const setScrollTagHandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setScrollTag(+event.target.value);
    }, [])

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

    useEffect(() => {
        console.log('scrollRef:', scrollRef.current); // Debugging: Log the ref to ensure it's not undefined
    }, [scrollRef]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const targetElement = scrollRef.current.querySelector(`#i${scrollTag}`);
            if (targetElement) {
                targetElement.scrollIntoView();
            } else {
                console.error(`Element with ID ${scrollTag} not found.`);
            }
        } else {
            console.error('scrollRef is undefined.');
        }
    };

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
            <div className="rounded-xl shadow-xl flex items-center justify-around p-6 bg-gray-100 w-1/3 mt-6">
                <section className='flex flex-col'>
                    <label className='text-xl'>List size:</label>
                    <input
                        type="number"
                        name='count'
                        min={1}
                        max={scrollList?.listItems.length}
                        step={5}
                        className="text-xl w-72 h-16 p-4 mt-4 mb-3 border-2 border-sky-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                        value={scrollItemsCount} 
                        onChange={updateNewsCount}
                    />
                </section>
                <section className='flex flex-col'>
                    <label className='text-xl'>Scroll to:</label>
                    <div className='flex justify-between w-[30rem] items-center'>
                        <input 
                            type="number"
                            name='scrollto'
                            min={1}
                            max={scrollList?.listItems.length}
                            step={1}
                            className="text-xl w-72 h-16 p-4 mt-4 mb-3 border-2 border-sky-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                            value={scrollTag} 
                            onChange={setScrollTagHandler}
                        />
                        <Button onClick={handleScroll}>Scroll</Button>
                    </div>
                </section>
            </div>
            <div 
                ref={scrollRef}
                className='h-[75vh] w-1/3 overflow-y-auto mt-10 shadow-xl rounded-xl'
            >
                {scrollList?.listItems?.map(listItem => (
                    <ScrollItem
                        id={listItem.index}
                        key={listItem.index} 
                        title={listItem.title} 
                    />
                ))}
            </div>
            <Toaster />
        </div>
    )
}