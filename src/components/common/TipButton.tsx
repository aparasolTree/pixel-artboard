import React from 'react';
import styled from 'styled-components';

export interface TipButtonProps {
    onClick?: (event: Event) => void;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    tip?: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    bgColor?: string;
    ftColor?: string;
    className?: string;
}

const Container = styled.button`
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    border-radius: 3px;
    padding: 2px;
    position: relative;

    &:hover {
        background-color: rgba(200, 200, 200, 0.5);
    }

    &:hover .__tip {
        opacity: 1;
        visibility: visible;
    }
`;

const Tip = styled.div<{ bgColor?: string; ftColor?: string }>`
    border-radius: 5px;
    height: 24px;
    padding: 5px;
    position: absolute;
    background-color: ${(props) => props.bgColor ?? ''};
    color: ${(props) => props.ftColor ?? ''};
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    white-space: nowrap;
`;

const directionMap = {
    left: { top: '50%', transform: 'translateY(-50%)', right: '120%' },
    right: { top: '50%', transform: 'translateY(-50%)', left: '120%' },
    bottom: { left: '50%', transform: 'translateX(-50%)', top: '120%' },
    top: { left: '50%', transform: 'translateX(-50%)', bottom: '120%' },
};

export default function TipButton({
    style,
    onClick,
    tip,
    direction = 'left',
    children,
    bgColor,
    ftColor,
    className,
}: TipButtonProps) {
    return (
        <Container
            style={style}
            onClick={({ nativeEvent }) => onClick?.(nativeEvent)}
            className={className}
        >
            {children}
            <Tip
                style={directionMap[direction]}
                bgColor={bgColor}
                ftColor={ftColor}
                className='__tip'
            >
                {tip}
            </Tip>
        </Container>
    );
}
