import { useEffect, useState } from 'react';
import { usePixelArtboard } from '../pixel';
import NumberInput from './NumberInput';

export default function Columns() {
    const { controller } = usePixelArtboard();
    const [columns, setColumns] = useState<number>(controller.columns);

    useEffect(() => {
        const remove = controller.addEventListener('set:columns', () => {
            setColumns(controller.columns);
        });
        return () => remove();
    }, []);

    const onChange = (columns: number) => (controller.columns = columns);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 10 }}>Columns: </span>
            <NumberInput number={columns} min={0} max={30} onChange={onChange} />
        </div>
    );
}
