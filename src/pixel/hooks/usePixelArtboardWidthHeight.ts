import { useEffect, useState } from 'react';
import { usePixelArtboard } from '../context';

export default function usePixelArtboardWidthHeight() {
    const { controller } = usePixelArtboard();
    const [widthHeight, setWidthHeight] = useState<{ width: number; height: number }>(() => {
        return { width: controller.width, height: controller.height };
    });

    useEffect(() => {
        const removeList = controller.addEventListener(['width', 'height'], () => {
            const { width, height } = controller;
            setWidthHeight({ width, height });
        });
        return () => removeList.forEach((fn) => fn());
    }, []);

    return widthHeight;
}
