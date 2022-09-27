import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ColorPickPanel from './ColorPickerPanel';
import ColorPickerProvider from './context';
import ColorPickerButton from './ColorPickerButton';

const Container = styled.div`
    position: relative;
    z-index: 999;
`;

export interface ColorPickerProps {
    onChange?: (color: string) => void;
    defaultColor?: string;
    width?: number;
    height?: number;
}

export default function ColorPicker({ onChange, defaultColor, ...size }: ColorPickerProps) {
    const [showPanel, toggle] = useState(false);

    return (
        <ColorPickerProvider defaultColor={defaultColor} onChange={onChange}>
            <Container>
                <ColorPickerButton toggle={() => toggle(!showPanel)} {...size} />
                <ColorPickPanel showPanel={showPanel} close={() => toggle(false)} />
            </Container>
        </ColorPickerProvider>
    );
}
