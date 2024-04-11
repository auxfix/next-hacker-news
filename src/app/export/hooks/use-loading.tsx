import { useState } from 'react';

export function useLoading(loadHandler:  () => Promise<void>): [
    boolean, () => void
] {
    const [isLoading, setIsLoading] = useState(false);
    function doLoad() {
        setIsLoading(true);
        loadHandler().then(() => { setIsLoading(false); });
    }
    return [isLoading, doLoad];
}