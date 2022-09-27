import { useCallback, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import WebBody from './components/WebBody';

import WebHeader from './components/WebHeader';
import { PixelArtboardProivder } from './pixel';

const light = {
    type: 'light',
    bgPrimary: '#f1f5f8',
    bgSecondary: '#fff',
    bgTertiary: '#eee',
    ftPrimary: '#222',
    ftSecondary: '#333',
    ftTertiary: '#444',
};

const drak = {
    type: 'drak',
    bgPrimary: '#222',
    bgSecondary: '#333',
    bgTertiary: '#444',
    ftPrimary: '#f1f5f8',
    ftSecondary: '#fff',
    ftTertiary: '#eee',
};

const Container = styled.div<Theme>`
    display: flex;
    height: 100vh;
    flex-direction: column;
    background-color: ${(props) => props.bgPrimary};
`;

function App() {
    const [theme, setTheme] = useState(light);
    const toggleTheme = useCallback(() => {
        setTheme(({ type }) => (type === 'light' ? drak : light));
    }, []);

    return (
        <ThemeProvider theme={{ theme, toggleTheme }}>
            <PixelArtboardProivder width={450} height={450} rows={30} cloumns={30}>
                <Container {...theme} className='color-transition'>
                    <WebHeader></WebHeader>
                    <WebBody></WebBody>
                </Container>
            </PixelArtboardProivder>
        </ThemeProvider>
    );
}

export default App;
