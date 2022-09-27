import { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasBackground from '../canvasBackground';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export default function Background() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [{ width, height }, setSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        if (container.current) {
            const { width, height } = container.current.getBoundingClientRect();
            setSize({ width, height });
        }
    }, []);

    useLayoutEffect(() => {
        if (canvas.current) {
            new CanvasBackground(canvas.current, { count: 70, width, height });
        }
    }, [width, height]);

    return (
        <Container ref={container}>
            <canvas
                style={{ display: 'block' }}
                ref={canvas}
                width={width}
                height={height}
            ></canvas>
        </Container>
    );
}
