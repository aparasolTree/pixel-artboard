import { useRef } from 'react';
import styled from 'styled-components';
import useSize from '../../hooks/useSize';
import useSlider from '../../hooks/useSlider';
import type { HSV } from './context';

const Color = styled.div<{ hue: number }>`
    width: 300px;
    height: 150px;
    background-color: hsl(${(props) => props.hue + 6}deg, 100%, 50%);
    position: relative;

    &:after,
    &:before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #000 0%, transparent 100%);
    }

    &:before {
        background: linear-gradient(to right, #fff 0%, transparent 100%);
    }
`;

const PickPoint = styled.div`
    width: 4px;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    cursor: pointer;

    &:after {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        border: 3px solid #aaa;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
`;

export interface ColorSVPanelProps {
    h: number;
    s: number;
    v: number;
    setHSV: (hsl: Partial<HSV>) => void;
}

export default function ColorSVpanel({ setHSV, h, s, v }: ColorSVPanelProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { width, height } = useSize({ ref });
    const { handleMouseDown } = useSlider({
        ref,
        onMoving({ left, top, width, height }) {
            setHSV({
                s: left / width,
                v: 1 - top / height,
            });
        },
    });

    return (
        <Color hue={h} ref={ref}>
            <PickPoint
                onMouseDown={handleMouseDown}
                style={{
                    transform: `translate(${s * width}px, ${height - v * height}px)`,
                }}
            />
        </Color>
    );
}
