import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Brush from './icons/Brush';
import Rubber from './icons/Rubber';
import Fill from './icons/Fill';
import Eyedropper from './icons/Eyedropper';
import { usePixelArtboard } from '../pixel';
import TipButton from './common/TipButton';

const Container = styled.div<{ bgColor: string }>`
    width: 30px;
    padding: 5px 0;
    background-color: ${(props) => props.bgColor};
    position: absolute;
    left: -30px;
    top: 200px;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

const Icon = styled.button<{ bgColor: string }>`
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    border-radius: 3px;
    padding: 2px;

    &:hover {
        background-color: ${(props) => props.bgColor};
    }
`;
const actions = [Brush, Rubber, Fill, Eyedropper];

type MouseState = 'brush' | 'rubber' | 'fill';
export default function OperationMenu() {
    const { controller } = usePixelArtboard();
    const [state, setState] = useState<MouseState>('brush');
    const { theme } = useTheme() as DefaultTheme;

    const changeBrush = (state: MouseState) => {
        setState(state);
        controller.brushState = state;
    };

    return (
        <Container bgColor={theme.bgSecondary}>
            {actions.map((Component) => {
                return (
                    <TipButton
                        key={Component.displayName}
                        bgColor={theme.bgSecondary}
                        style={{
                            backgroundColor:
                                state === Component.displayName ? theme.bgTertiary : '',
                            color: theme.ftPrimary,
                        }}
                        onClick={() => changeBrush(Component.displayName as MouseState)}
                        tip={Component.displayName}
                    >
                        <Component stroke={theme.ftSecondary} />
                    </TipButton>
                );
            })}
        </Container>
    );
}
