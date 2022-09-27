import { useEffect, useState } from 'react';
import { usePixelArtboard } from '../pixel';
import NumberInput from './NumberInput';

export default function Rows() {
    const { controller } = usePixelArtboard();
    const [rows, setRows] = useState<number>(controller.rows);

    useEffect(() => {
        const remove = controller.addEventListener('set:rows', () => {
            setRows(controller.rows);
        });
        return () => remove();
    }, []);

    const onChange = (rows: number) => (controller.rows = rows);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 10 }}>Rows: </span>
            <NumberInput number={rows} min={0} max={30} onChange={onChange} />
        </div>
    );
}
