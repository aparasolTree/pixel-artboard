import styled from "styled-components";

import { CollectProvider } from "../context/CollectContext";

import PixelArtboard from "./PixelArtboard";
import Sidebar from "./Sidebar";
import Background from "./Background";
import useKeyDown from "../hooks/useKeyDown";
import React from "react";
import { usePixelArtboard } from "../pixel";

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
    const { controller } = usePixelArtboard();
    useKeyDown(
        "Ctrl+z",
        React.useCallback(() => controller.back(), [])
    );
    useKeyDown(
        "Ctrl+y",
        React.useCallback(() => controller.forward(), [])
    );
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
