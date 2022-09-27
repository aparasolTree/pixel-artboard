import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useSize from '../../hooks/useSize';
import useSlider from '../../hooks/useSlider';

const Container = styled.div`
    position: relative;
    margin-left: 5px;
    width: 8px;
    height: 150px;
    background: linear-gradient(
        to bottom,
        #f00 0%,
        #ff0 17%,
        #0f0 33%,
        #0ff 50%,
        #00f 67%,
        #f0f 83%,
        #f00 100%
    );
`;

const Thumb = styled.div`
    width: 100%;
    height: 5px;
    position: absolute;
    cursor: pointer;

    &:after {
        content: '';
        display: block;
        width: 100%;
        height: 5px;
        border-radius: 2px;
        padding: 0 2px;
        background-color: #fff;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        transform: translate(-2px, -50%);
    }
`;

export interface HueSliderProps {
    h: number;
    onChange: (hue: number) => void;
}

export default function HueSlider({ onChange, h }: HueSliderProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { height } = useSize({ ref });
    const { handleMouseDown } = useSlider({
        ref,
        onMoving({ top, height }) {
            onChange(top / height);
        },
    });

    return (
        <Container ref={ref}>
            <Thumb
                style={{ transform: `translateY(${(h / 360) * height}px)` }}
                onMouseDown={handleMouseDown}
            ></Thumb>
        </Container>
    );
}
