import { useEffect, useRef, useState } from 'react';
import { usePixelArtboard } from '../context';
import { Fn } from '../EventTarget';

const noop = () => {};
export default function usePixelArtboardSize() {
    const [size, setSize] = useState<number>(0);
    const remove = useRef<Fn>(noop);

    const { controller } = usePixelArtboard();

    useEffect(() => {
        const eventList = controller.addEventListener('size', () => {
            setSize(controller.size);
        });
        remove.current = () => eventList();
        return () => {
            remove.current();
        };
    }, []);

    return { size, remove: remove.current };
}
