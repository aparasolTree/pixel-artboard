import React, { useLayoutEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { usePixelArtboard } from '../pixel';
import Actions from './Actions';
import PixelArtboardInfo from './PixelArtboardInfo';
import NameInput from './NameInput';
import ContextMenu from './ContextMenu';

const Container = styled.div`
    flex: 2;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Canvas = styled.canvas<Theme>`
    margin-top: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.bgSecondary};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

export type Position = { left: number; top: number };
export default function PixelArtboard() {
    const [showInfoCard, toggle] = useState<boolean>(false);
    const [showContextMenu, toggleContextMenu] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ left: 0, top: 0 });
    const canvas = useRef<HTMLCanvasElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const { theme } = useTheme() as DefaultTheme;
    const { controller } = usePixelArtboard();

    useLayoutEffect(() => {
        if (canvas.current) {
            return controller.mount(canvas.current);
        }
    }, []);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        const ele = container.current;
        if (!ele) return;

        const { clientX, clientY } = event;
        const { top, left } = ele.getBoundingClientRect();
        setPosition({ top: clientY - top, left: clientX - left });
        toggleContextMenu(true);
    };

    return (
        <Container
            ref={container}
            onContextMenu={handleContextMenu}
            onMouseDown={() => showContextMenu && toggleContextMenu(false)}
        >
            <NameInput />
            <Canvas {...theme} ref={canvas} />
            <Actions />
            <PixelArtboardInfo showInfoCard={showInfoCard} toggle={() => toggle(false)} />
            <ContextMenu
                isShow={showContextMenu}
                {...position}
                showInfo={() => toggle(true)}
                close={() => toggleContextMenu(false)}
            />
        </Container>
    );
}
