import styled from 'styled-components';
import usePixelArtboardSize from '../pixel/hooks/usePixelArtboardSize';
import { formatSize } from '../utils';

const Container = styled.div`
    height: 30px;
    line-height: 30px;
`;

export default function FixelArtboardSize() {
    const { size } = usePixelArtboardSize();
    return (
        <Container>
            size: <span>{formatSize(size)}</span>
        </Container>
    );
}
