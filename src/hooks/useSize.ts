import React, { useEffect, useState } from 'react';

export interface UseSizeOptions {
    ref: React.RefObject<HTMLElement>;
    defaultState?: { width: number; height: number };
}

export default function useSize(options: UseSizeOptions) {
    const { ref, defaultState = { width: 0.01, height: 0.01 } } = options;
    const [size, setSize] = useState(defaultState);

    useEffect(() => {
        if (ref.current) {
            const { width, height } = ref.current.getBoundingClientRect();
            setSize({ width, height });
        }
    }, []);

    return size;
}
