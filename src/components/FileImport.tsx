import React from 'react';
import styled, { useTheme } from 'styled-components';
import { usePixelArtboard } from '../pixel';
import DropdownList from './DropdownList';
import Import from './icons/Import';

const FileInput = styled.label`
    width: 100%;
    height: 140px;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border: 2px dashed #ccc;
    border-radius: 5px;
    box-sizing: border-box;

    &:after,
    &:before {
        content: '';
        display: block;
        width: 6px;
        height: 100px;
        background-color: #ccc;
        position: absolute;
        border-radius: 3px;
    }

    &:before {
        transform: rotate(90deg);
    }
`;

export default function FileImport() {
    const { theme } = useTheme() as DefaultTheme;
    const { controller } = usePixelArtboard();

    const handleChange: React.FormEventHandler = ({ target }) => {
        const files = (target as HTMLInputElement).files;
        if (files?.length) {
            const file = files[0];
            if (file.name.includes('.json')) {
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onerror = console.error;
                reader.onload = ({ target }) => {
                    const result = JSON.parse((target?.result as string) ?? '') as any;
                    result &&
                        controller.modify({
                            name: result.name,
                            column: result.column,
                            id: result.id,
                            pixels: result.pixels,
                            row: result.row,
                            width: result.width,
                            height: result.height,
                        });
                };
            }
        }
    };

    return (
        <DropdownList
            backgroundColor={theme.bgPrimary}
            trigger={<Import stroke={theme.ftSecondary} />}
        >
            <FileInput>
                <input
                    type='file'
                    style={{ opacity: 0, visibility: 'hidden' }}
                    accept='.json'
                    onChange={handleChange}
                />
            </FileInput>
        </DropdownList>
    );
}
