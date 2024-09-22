import { useLayoutEffect, useState, useEffect, useMemo } from "react";

interface VirtualScrollParams {
    listHeight: number;
    elementHeight: number;
    listLength?: number;
    overscan: number;
    scrollTimout: number;
    getContainer: () => React.RefObject<HTMLDivElement>;
}

export function useVirtualScroll(params: VirtualScrollParams, deps: any[]): [{index: number, offset: number}[], number, boolean] {
    const {
        listHeight,
        elementHeight,
        listLength = 0,
        overscan = 3,
        scrollTimout = 200,
        getContainer,
    } = params;

    const [ isScrolling, setIsScrolling ] = useState(false);
    const scrollRef = getContainer();

    useLayoutEffect(() => {
        console.log('scrollRef:', scrollRef); // Debugging: Log the ref to ensure it's not undefined
        console.log('scrollRef.current:', scrollRef.current); // Debugging: Log the ref to ensure it's not undefined
    }, [scrollRef, scrollRef.current]);


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
    },[...deps])

    useEffect(() => {
        const scrollElement = scrollRef.current;
        
        if(!scrollElement) { return; }

        let timoutId: any = null;
        const handleScroll = () => {
            setIsScrolling(true);
            if(timoutId) { clearTimeout(timoutId); }
            timoutId = setTimeout(() => {
                setIsScrolling(false); 
            }, scrollTimout)
        }

        handleScroll();

        scrollElement.addEventListener('scroll', handleScroll);

        return () => {
            setIsScrolling(false); 
            scrollElement.removeEventListener('scroll', handleScroll);
        }
    },[...deps])

    const virtualItems = useMemo(() => {
        let rangeStart = scrollTop;
        let rangeEnd = scrollTop + listHeight;
        //console.log(rangeStart, rangeEnd, rangeStart / itemHeight, rangeEnd / itemHeight);
        let startIndex = Math.floor(rangeStart / elementHeight);
        let endIndex = Math.ceil(rangeEnd / elementHeight);

        startIndex = Math.max(0, startIndex - overscan);
        endIndex = Math.min(listLength - 1, endIndex + overscan);

        let virtualItems = [];

        for(let i = startIndex; i <= endIndex; i++) {
            virtualItems.push({
                index: i,
                offset: i * elementHeight,
            })
        }

        return virtualItems;
    }, [scrollTop, listLength])

    const totalListHeight = listLength * elementHeight;

    return [virtualItems, totalListHeight, isScrolling]
}