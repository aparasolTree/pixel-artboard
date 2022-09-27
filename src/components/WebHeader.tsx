import React from 'react';
import styled, { useTheme } from 'styled-components';

import ThemeSwitch from './ThemeSwitch';
import HistoricalReview from './HistoricalReview';
import FileImport from './FileImport';

const Header = styled.header<Theme>`
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.ftPrimary};
    background-color: ${(props) => props.bgPrimary};
    border-bottom: 3px solid rgba(106, 176, 76, 0.5);
`;

const WebTitle = styled.div`
    height: var(--header-height);
    display: flex;
    font-size: 20px;
    align-items: center;
    justify-content: center;
`;

const Controller = styled.div`
    display: flex;
`;

export default function WebHeader() {
    const { theme } = useTheme() as DefaultTheme;

    return (
        <Header {...theme} className='color-transition'>
            <WebTitle>Fixel Artboard</WebTitle>
            <Controller>
                <FileImport />
                <HistoricalReview />
                <ThemeSwitch />
            </Controller>
        </Header>
    );
}
