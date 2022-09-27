import React, { useCallback, useContext, useState } from 'react';
import { Pixels } from '../pixel';
import { genId } from '../utils';

export type Collect = {
    time: number;
    pixels: Pixels;
    name: string;
    size: number;
    id: string;
    row: number;
    width: number;
    height: number;
    column: number;
};
export type Collects = Collect[];
const Context = React.createContext<{
    collect: Collects;
    add: (options: Omit<Collect, 'time'>) => void;
    remove: (id: string) => void;
}>(null!);

export const useCollect = () => useContext(Context);

const localStorageKey = '__pixel-artboard-cellect';
export const CollectProvider = ({ children }: React.PropsWithChildren) => {
    const [collect, setCollect] = useState<Collects>(() => {
        return JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
    });

    const add = useCallback((options: Omit<Collect, 'time'>) => {
        if (!options.name) return;
        setCollect((prev) => {
            const index = prev.findIndex(({ id: fileId }) => fileId === options.id);
            if (index >= 0) {
                prev[index].size = options.size;
                prev[index].name = options.name;
                prev[index].time = Date.now();
                prev[index].pixels = [...options.pixels];
                window.localStorage.setItem(localStorageKey, JSON.stringify(prev));
                return [...prev];
            }
            const collect = [...prev, { time: Date.now(), ...options, id: genId() }];
            window.localStorage.setItem(localStorageKey, JSON.stringify(collect));
            return collect;
        });
    }, []);

    const remove = useCallback((id: string) => {
        setCollect((prev) => {
            const index = prev.findIndex((collect) => collect.id === id);
            if (index >= 0) {
                prev.splice(index, 1);
                window.localStorage.setItem(localStorageKey, JSON.stringify(prev));
                return [...prev];
            }
            return prev;
        });
    }, []);

    return <Context.Provider value={{ collect, add, remove }}>{children}</Context.Provider>;
};
