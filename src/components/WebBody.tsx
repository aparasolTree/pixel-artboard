import styled from 'styled-components';

import { CollectProvider } from '../context/CollectContext';

import PixelArtboard from './PixelArtboard';
import Sidebar from './Sidebar';
import Background from './Background';

const Container = styled.div`
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
`;

const Main = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    flex: 1;
    display: flex;
`;

export default function WebBody() {
    return (
        <Container>
            <Background />
            <CollectProvider>
                <Main>
                    <PixelArtboard></PixelArtboard>
                    <Sidebar></Sidebar>
                </Main>
            </CollectProvider>
        </Container>
    );
}
