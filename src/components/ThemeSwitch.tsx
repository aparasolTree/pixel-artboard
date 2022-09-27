import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';

import Light from './icons/Sun';
import Dark from './icons/Moon';

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    height: var(--header-height);

    &::before {
        content: '';
        display: block;
        width: 1px;
        height: 24px;
        background-color: var(--border-color);
    }
`;

const SwitchButton = styled.button<Theme>`
    margin-left: 10px;
    padding: 0;
    width: 40px;
    display: flex;
    border-radius: 10px;
    border: 1px solid #aaa;
    background-color: ${(props) => props.bgTertiary};
`;

const SwitchSpan = styled.span<Theme & { translateX: number }>`
    width: 18px;
    margin: 1px;
    height: 18px;
    display: flex;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease-in-out;
    background-color: ${(props) => props.bgPrimary};
    transform: translateX(${(props) => props.translateX}%);
`;

export default function ThemeSwitch() {
    const { toggleTheme: TTheme, theme } = useTheme() as DefaultTheme;
    const [translateX, setTranslateX] = useState(0);
    const iconProps = { width: 15, height: 15, stroke: theme.ftSecondary };

    const toggleTheme = () => {
        TTheme();
        if (theme.type === 'light') setTranslateX(100);
        else setTranslateX(0);
    };

    return (
        <SwitchContainer>
            <SwitchButton {...theme} type='button'>
                <SwitchSpan {...theme} translateX={translateX} onClick={toggleTheme}>
                    {theme.type === 'light' ? <Light {...iconProps} /> : <Dark {...iconProps} />}
                </SwitchSpan>
            </SwitchButton>
        </SwitchContainer>
    );
}
