import { useEffect, useMemo, useState } from 'react';
import { usePixelArtboard } from '../context';
import { Pixels } from '../PixelArtboard';

export default function usePixelArtboardHistory() {
    const { controller } = usePixelArtboard();
    const [history, setHistory] = useState<Pixels[]>([]);

    useEffect(() => {
        const removeList = controller.addEventListener(
            ['save', 'back', 'forward', 'reset'],
            async () => {
                setHistory([...controller.past, controller.pixels, ...controller.future]);
            }
        );

        return () => removeList.forEach((fn) => fn());
    }, []);

    const actions = useMemo(() => {
        const back = () => controller.back();
        const forward = () => controller.forward();
        return { back, forward };
    }, []);

    return { history, ...actions };
}
