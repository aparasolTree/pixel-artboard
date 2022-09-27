import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { usePixelArtboard } from '../pixel';

const Input = styled.input<{ ftColor: string }>`
    border: none;
    font-size: 20px;
    outline: none;
    background-color: transparent;
    text-align: center;
    color: ${(props) => props.ftColor};
`;

export default function NameInput() {
    const { controller } = usePixelArtboard();
    const [name, setName] = useState(controller.name);
    const { theme } = useTheme() as DefaultTheme;

    const set_name = (value: string) => (controller.name = value);

    useEffect(() => {
        return controller.addEventListener('change:name', () => {
            setName(controller.name);
        });
    }, []);

    return (
        <Input
            value={name}
            onChange={({ target }) => set_name(target.value)}
            placeholder='filename'
            ftColor={theme.ftSecondary}
        />
    );
}
