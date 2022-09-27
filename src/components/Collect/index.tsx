import styled, { useTheme } from 'styled-components';
import CollectList from './CollectList';

const CollectListContainer = styled.div<{ bgColor: string }>`
    width: 500px;
    box-sizing: border-box;
    background-color: ${(props) => props.bgColor};
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    overflow-x: auto;
`;

const Title = styled.h2`
    padding-left: 20px;
`;

export interface CollectProps {
    bgColor: string;
    ftColor: string;
}

export default function Collect({ bgColor, ftColor }: CollectProps) {
    return (
        <div>
            <header>
                <Title>Collect</Title>
            </header>
            <CollectListContainer bgColor={bgColor}>
                <CollectList />
            </CollectListContainer>
        </div>
    );
}
