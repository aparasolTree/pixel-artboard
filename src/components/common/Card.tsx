import React from 'react';
import styled from 'styled-components';

type Size = { width?: string; height?: string };
type Color = { bgColor?: string; ftColor?: string };

const Container = styled.div<Size & Color>`
    width: ${(props) => props.width ?? ''};
    height: ${(props) => props.height ?? ''};
    color: ${(props) => props.ftColor ?? '#333'};
    background-color: ${(props) => props.bgColor ?? '#f1f5f8'};
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
`;

export interface CardProps {
    width?: string;
    height?: string;
    bgColor?: string;
    ftColor?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function Card({ children, ...rest }: CardProps) {
    return <Container {...rest}>{children}</Container>;
}
