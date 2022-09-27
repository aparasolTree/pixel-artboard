import styled, { useTheme } from 'styled-components';

export interface ContextMenuProps {
    left: number;
    top: number;
    isShow: boolean;
    close: () => void;
    showInfo: () => void;
}

const Container = styled.div<{ bgColor: string; ftColor: string }>`
    width: 120px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.ftColor};
    border-radius: 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    position: absolute;
    padding: 10px;
    font-size: 14px;
    border: 1px solid rgba(25, 25, 25, 0.3);
`;

const MenuItem = styled.p`
    padding: 4px 10px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
        background-color: #f1f5f8;
    }
`;

export default function ContextMenu({ top, left, isShow, showInfo, close }: ContextMenuProps) {
    const { theme } = useTheme() as DefaultTheme;
    return (
        <Container
            onMouseDown={(event) => event.stopPropagation()}
            onMouseUp={close}
            bgColor={theme.bgSecondary}
            ftColor={theme.ftSecondary}
            style={{ visibility: isShow ? 'visible' : 'hidden', top, left }}
        >
            <MenuItem onClick={showInfo}>Show info</MenuItem>
        </Container>
    );
}
