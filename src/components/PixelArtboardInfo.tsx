import styled from 'styled-components';
import { useTheme } from 'styled-components';
import Card from './common/Card';
import PixelArtboardSize from './PixelArtboardSize';
import PixelArtboardWidthHeight from './PixelArtboardWidthHeight';
import Close from './icons/Close';

export interface PixelArtboardInfoProps {
    showInfoCard: boolean;
    toggle: () => void;
}

const Title = styled.p`
    margin: 0;
    font-size: 16px;
    padding: 15px;
    color: #686de0;
`;

const InfoList = styled.div`
    border-top: 1px solid #ccc;
    padding: 0 20px;
`;

const CloseWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
`;

export default function PixelArtboardInfo({ showInfoCard, toggle }: PixelArtboardInfoProps) {
    const { theme } = useTheme() as DefaultTheme;
    return (
        <Card
            bgColor={theme.bgSecondary}
            ftColor={theme.ftSecondary}
            width='260px'
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                visibility: showInfoCard ? 'visible' : 'hidden',
            }}
        >
            <CloseWrapper onClick={toggle}>
                <Close stroke={theme.ftSecondary} />
            </CloseWrapper>
            <Title>Pixel Artboard Info</Title>
            <InfoList>
                <PixelArtboardSize />
                <PixelArtboardWidthHeight />
            </InfoList>
        </Card>
    );
}
