import styled from 'styled-components';
import { useCollect } from '../../context/CollectContext';

import CollectItem from './CollectItem';

const Container = styled.ul<{ width: number }>`
    padding: 0;
    height: 200px;
    width: ${(props) => props.width + 'px'};
    display: flex;
    align-items: center;
`;

export default function CollectList() {
    const { collect, remove } = useCollect();

    return (
        <Container width={collect.length * 140 ?? 0}>
            {collect.map((info) => {
                return <CollectItem key={info.id} {...info} remove={remove} />;
            })}
        </Container>
    );
}
