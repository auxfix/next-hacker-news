import { useLayoutEffect, useState, useEffect, } from "react";

interface VirtualScrollParams {
    listHeight: number;
    elementHeight: number;
    getContainer: () => React.RefObject<HTMLDivElement>;
}

const itemHeight = 62.5;
const containerHeight = 600;
const overscan = 2;
const scrollTimout = 300;

function isNumeric(num: any){
    return !isNaN(num)
}

function useVirtualScroll(params: VirtualScrollParams) {
    const {
        listHeight,
        elementHeight,
        getContainer
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
    },[scrollRef, scrollRef.current])

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
    },[])

    const virtualItems = useMemo(() => {
        let rangeStart = scrollTop;
        let rangeEnd = scrollTop + containerHeight;
        //console.log(rangeStart, rangeEnd, rangeStart / itemHeight, rangeEnd / itemHeight);
        let startIndex = Math.floor(rangeStart / itemHeight);
        let endIndex = Math.ceil(rangeEnd / itemHeight) + 3;

        startIndex = Math.max(0, startIndex - overscan);
        endIndex = Math.min(scrollList?.listItems?.length! - 1, endIndex + overscan);

        let virtualItems = [];

        for(let i = startIndex; i <= endIndex; i++) {
            virtualItems.push({
                index: i,
                offset: i * itemHeight,
            })
        }

        return virtualItems;
    }, [scrollTop, scrollList?.listItems?.length])

    const totalListHeight = scrollList?.listItems?.length! * itemHeight;
}