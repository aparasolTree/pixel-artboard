import { useEffect, useState } from 'react';
import { usePixelArtboard } from '../pixel';
import NumberInput from './NumberInput';

export default function Height() {
    const { controller } = usePixelArtboard();
    const [height, setHeight] = useState<number>(controller.height);

    useEffect(() => {
        const remove = controller.addEventListener('height', () => {
            setHeight(controller.height);
        });
        return () => remove();
    }, []);

    const onChange = (height: number) => (controller.height = height);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 10 }}>Height: </span>
            <NumberInput number={height} min={100} max={500} onChange={onChange} />
        </div>
    );
}
