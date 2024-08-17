'use client'

import { useCallback, useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateNewsItems } from '@/lib/query/queries'
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { getListItemstCountSelector, setListItemsCount } from '@/lib/redux/features/news';
import ScrollItem from '@/features/news/components/ListItem';
import Button from '../SimpleButton';


const itemHeight = 62.5;
const containerHeight = 600;
const overscan = 2;

function isNumeric(num: any){
    return !isNaN(num)
  }


export default function VScroll() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const store = useAppStore();
    const scrollItemsCount = useAppSelector(getListItemstCountSelector);
    const [ scrollTag, setScrollTag ] = useState('5');

    const { data: scrollList, isRefetching, isLoading } = useQuery({ 
        queryKey: ['vscroll'], 
        queryFn: () => generateNewsItems(scrollItemsCount),
    })

    const updateNewsCount = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        store.dispatch(setListItemsCount(+event.target.value))
    },[])

    const setScrollTagHandler = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
    
        // Allow the input to be empty or a valid number
        if (inputValue === "" || /^\d*$/.test(inputValue)) {
            setScrollTag(event.target.value);
        }
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

    useLayoutEffect(() => {
        console.log('scrollRef:', scrollRef); // Debugging: Log the ref to ensure it's not undefined
        console.log('scrollRef.current:', scrollRef.current); // Debugging: Log the ref to ensure it's not undefined
    }, [scrollRef, scrollRef.current]);

    const handleScroll = () => {
        if (scrollRef.current && isNumeric(scrollTag)) {
            const targetElement = scrollRef.current.querySelector(`#i${scrollTag}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error(`Element with ID ${scrollTag} not found.`);
            }
        } else {
            console.error('scrollRef is undefined.');
        }
    };

    //-------------------------------------------
    // scroll block
    const [scrollTop, setScrollTop] = useState(0);

    useLayoutEffect(() => {
        const scrollElement = scrollRef.current;
        
        if(!scrollElement) { return; }

        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop;          
            setScrollTop(scrollTop);
        }

        handleScroll();

        scrollElement.addEventListener('scroll', handleScroll);

        return () => scrollElement.removeEventListener('scroll', handleScroll);
    },[scrollRef, scrollRef.current, isLoading])

    const virtualItems = useMemo(() => {
        let rangeStart = scrollTop;
        let rangeEnd = scrollTop + containerHeight;
        console.log(rangeStart, rangeEnd, rangeStart / itemHeight, rangeEnd / itemHeight);
        let startIndex = Math.floor(rangeStart / itemHeight);
        let endIndex = Math.ceil(rangeEnd / itemHeight) + 3;

        startIndex = Math.max(0, startIndex - overscan);
        endIndex = Math.min(scrollList?.listItems?.length! - 1, endIndex + overscan);

        let virtualItems = [];

        for(let i = startIndex; i < endIndex; i++) {
            virtualItems.push({
                index: i,
                offset: i * itemHeight,
            })
        }

        return virtualItems;
    }, [scrollTop, scrollList?.listItems?.length])

    const totalListHeight = scrollList?.listItems?.length! * itemHeight;

    console.log(virtualItems)

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
            <p className='text-xl'>scroll top: {scrollTop}</p>
            <div className="rounded-xl shadow-xl flex items-center justify-around p-6 bg-gray-100 w-1/3 mt-6 min-w-[60rem]">
                <section className='flex flex-col'>
                    <label className='text-xl'>List size:</label>
                    <input
                        type="number"
                        name='count'
                        min={0}
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
                            type="text"
                            name='scrollto'
                            min={0}
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
                className='h-[600px] w-1/3 min-w-[60rem] overflow-y-auto mt-10 shadow-xl rounded-xl'
            >
                <div style={{ height: totalListHeight, position: 'relative' }}>
                  {
                    virtualItems?.map(vi => {
                        let item = scrollList?.listItems![vi.index]!;
                        return (<ScrollItem
                            style={{
                                position: 'absolute',
                                top: 0,
                                transform: `translateY(${vi.offset}px)`
                                }}
                            id={item.index}
                            key={item.index} 
                            title={item.title} 
                        />) 
                    })
                  }
                </div>
            </div>
            <Toaster />
        </div>
    )
}