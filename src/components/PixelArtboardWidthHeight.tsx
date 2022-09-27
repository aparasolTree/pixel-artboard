import styled from 'styled-components';
import usePixelArtboardWidthHeight from '../pixel/hooks/usePixelArtboardWidthHeight';

const Item = styled.div`
    line-height: 30px;
`;

export default function PixelArtboardWidthHeight() {
    const { width, height } = usePixelArtboardWidthHeight();
    return (
        <div>
            <Item>
                width: <span>{width}px</span>
            </Item>
            <Item>
                height: <span>{height}px</span>
            </Item>
        </div>
    );
}
