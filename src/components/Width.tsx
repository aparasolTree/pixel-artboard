import { useEffect, useState } from 'react';
import { usePixelArtboard } from '../pixel';
import NumberInput from './NumberInput';

export default function Width() {
    const { controller } = usePixelArtboard();
    const [width, setWidth] = useState<number>(controller.width);

    useEffect(() => {
        const remove = controller.addEventListener('width', () => {
            setWidth(controller.width);
        });
        return () => remove();
    }, []);

    const onChange = (width: number) => (controller.width = width);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 10 }}>Width: </span>
            <NumberInput number={width} min={100} max={500} onChange={onChange} />
        </div>
    );
}
