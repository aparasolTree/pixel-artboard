import { useMemo } from 'react';
import styled from 'styled-components';
import { useColor } from './context';

const Button = styled.button<{ width?: number; height?: number }>`
    border: 0;
    width: ${(props) => props.width ?? 30}px;
    height: ${(props) => props.height ?? 20}px;
    cursor: pointer;
    border-radius: 5px;
`;

export interface PickerButtonProps {
    width?: number;
    height?: number;
    toggle: () => void;
}

export default function ColorPickerButton({ toggle, ...size }: PickerButtonProps) {
    const { hsl } = useColor();
    const backgroundColor = useMemo(
        () => `hsl(${hsl.h}deg, ${hsl.s * 100}%, ${hsl.l * 100}%)`,
        [hsl]
    );

    return <Button style={{ backgroundColor }} onClick={toggle} {...size} />;
}
