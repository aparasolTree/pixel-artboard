import { useState } from 'react';
import styled, { useTheme } from 'styled-components';

import Clock from './icons/Clock';
import DropdownList from './DropdownList';
import usePixelArtboardHistory from '../pixel/hooks/usePixelArtboardHistory';
import { Pixels, usePixelArtboard } from '../pixel';
import { blobToImgSrc, toBlob } from '../utils';

const HistoricalItem = styled.div<Theme>`
    padding: 5px 15px;
    border-radius: 5px;

    &:hover {
        background-color: ${(props) => props.bgTertiary};
    }
`;

const Title = styled.p`
    margin: 0;
    font-size: 16px;
    padding: 15px;
    color: #686de0;
`;

const HistoryList = styled.div`
    border-top: 1px solid #aaa;
    max-height: 200px;
    overflow: auto;
`;

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    position: absolute;
    top: 10px;
    left: -110px;
    border-radius: 10px;
    background-color: #fff;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

export default function HistoricalReview() {
    const { theme } = useTheme() as DefaultTheme;
    const { history } = usePixelArtboardHistory();
    const { controller } = usePixelArtboard();
    const [activeIndex, setActiveIndex] = useState<number>();
    const [url, _setURL] = useState<string>();

    const setURL = async (pixels: Pixels, index: number) => {
        const { rows, columns } = controller;
        _setURL(blobToImgSrc(await toBlob(pixels, rows, columns, controller)));
        setActiveIndex(index);
    };

    return (
        <DropdownList
            backgroundColor={theme.bgPrimary}
            trigger={<Clock stroke={theme.ftSecondary} />}
        >
            <Title>History</Title>
            <HistoryList>
                {history.map((matrix, index) => {
                    return (
                        <HistoricalItem
                            key={index}
                            {...theme}
                            onClick={() => setURL(matrix, index)}
                            style={{
                                backgroundColor: activeIndex === index ? theme.bgSecondary : '',
                            }}
                        >
                            {index === 0 ? 'initialize' : 'step ' + index}
                        </HistoricalItem>
                    );
                })}
                {url && (
                    <ImageWrapper>
                        <Image src={url} onLoad={() => url && URL.revokeObjectURL(url)} />
                    </ImageWrapper>
                )}
            </HistoryList>
        </DropdownList>
    );
}
