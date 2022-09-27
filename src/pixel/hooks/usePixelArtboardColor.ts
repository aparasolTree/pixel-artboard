import { useEffect, useState } from 'react';
import { usePixelArtboard } from '../context';

export default function usePixelArtboardColor() {
    const { controller } = usePixelArtboard();
    const [color, setColor] = useState<string>(controller.brushColor);

    useEffect(() => {
        return controller.addEventListener('change:color', () => {
            setColor(controller.brushColor);
        });
    }, []);

    return color;
}
